const { CustomError } = require("./custom-error");

class ValidationError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
    }
}

class PermissionError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
    }
}

class CloudError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
    }
}

class RollbackError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
    }
}

class ProcessExecutionError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
    }
}

class FileHandlingError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
    }
}

module.exports = { ValidationError, PermissionError, CloudError, RollbackError, ProcessExecutionError, FileHandlingError }