const { RollbackError, ProcessExecutionError } = require("../errors/errors");
const { logWithColor } = require("../utils/console-text-color");

// Saga design
class DeploymentStepController {
    constructor() {
        this.steps = [];
        this.success = [];
        this.callStack = [...this.steps];
        this.rollback = [];
        this.failedProcess = [];
    }


    startExecutionByOrder = async () => {
        for (let step of this.callStack) {
            this.success.push(step);
            try {
                await step.execute();
            } catch (error) {
                this.failedProcess.push(step);
                this.startRollback();
                const stepError = ProcessExecutionError(`Error in executing step ${step.name}`);
                throw stepError;
            }
        }
        process.exit();
    }
    startRollback = async () => {
        for (let step of this.failedProcess) {
            await this.step.rollback();
        }
    }

    addExecution = (process) => {
        this.steps.push(process);
        this.callStack = [...this.steps]
    }

    addToRollBack = (process) => {
        this.rollback.push(process);
    }

    addToFailedProcess = (process) => {
        this.failedProcess.push(process);
    }

    getProcessFromExecutionQueue = () => {
        return this.callStack.shift();
    }
    getProcessByRollbackStack = () => {
        return this.rollback.pop();
    }

    getSteps = () => {
        const stepNames = this.steps.map((step) => step.name);
        return stepNames.toString();
    }

}

module.exports = { DeploymentStepController }