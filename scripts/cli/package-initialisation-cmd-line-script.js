const readline = require("readline");
const questions = require("../../data/questions.json");
const fs = require("fs/promises");
const { appendFileSync } = require("fs")
const { RollbackError, ProcessExecutionError, FileHandlingError } = require("../../errors/errors");
const { Step } = require("../../bin/step");



let currentQuestionIndex = 0;

const askQuestions = async () => {
    try {
        const cmdlineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const askNextQuestion = () => {
            return new Promise((resolve, reject) => {
                if (currentQuestionIndex < questions.length) {
                    cmdlineInterface.question(questions[currentQuestionIndex].question, (answer) => {
                        process.env[questions[currentQuestionIndex].storingVariable] = answer;
                        writeEnvFile(questions[currentQuestionIndex].storingVariable, answer);
                        currentQuestionIndex++;
                        resolve();
                    })
                }
                else {
                    currentQuestionIndex = 0;
                    cmdlineInterface.close();
                    resolve();
                }
            })
        }
        while (currentQuestionIndex < questions.length) {
            await askNextQuestion();
        }

    } catch (error) {
        const data = await rollBackAskQuestionProcess();
        const processExecutionError = new ProcessExecutionError("Error in execution asking process");
        console.log(processExecutionError.getFormatedError());
        throw processExecutionError;
    }
}

const writeEnvFile = (key, value) => {
    try {
        appendFileSync("../.env", `\n${key}=${value}`);
    } catch {
        throw new FileHandlingError("Error in updating .env file");
    }

}

const rollBackAskQuestionProcess = async () => {
    try {
        for (let question of questions) {
            const data = await fs.readFile("./.env", "utf-8");
            const lines = data.split("\n");
            const updatedlines = lines.filter((line) => !line.includes(question.storingVariable));
            const updatedData = updatedlines.join("\n");
            await fs.writeFile("./.env", updatedData);
        }
    } catch (error) {
        const err = new RollbackError("Error in Rolling back the process");
        console.log(err.getFormatedError());
        throw err;
    }
}

const AskQuestionStep = new Step("Ask Question", askQuestions);
module.exports = { AskQuestionStep };
