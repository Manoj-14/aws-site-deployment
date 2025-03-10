const { RollbackError } = require("../errors/errors");
const { logWithColor } = require("../utils/console-text-color");

class Step {
    constructor(name, executorFunction, rollbackfunction = null, isRollbackneeded = false) {
        this.name = name;
        this.executorFunction = executorFunction;
        this.rollbackfunction = rollbackfunction;
        this.isRollbackneeded = isRollbackneeded;
    }

    execute = async () => {
        try {
            logWithColor(`${this.name}: Executing....`, 'yellow')
            await this.executorFunction();
            logWithColor(`${this.name}: Completed!`, "green")
        } catch (error) {
            console.error(error);
        }
    }

    rollback = async () => {
        if (this.isRollbackneeded) {
            try {
                await this.rollbackfunction();
            } catch (error) {
                throw new RollbackError(`Error in rolling back step ${this.name}`);
            }

        }
    }
}

module.exports = { Step }