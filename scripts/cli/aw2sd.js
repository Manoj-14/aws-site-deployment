const { spawn } = require("child_process");
const fsBase = require("fs");
const { logWithColor } = require("../../utils/console-text-color");
const { readFile } = require("fs/promises");
const { writeEnvFile } = require("../../utils/utils");
const { deploymentController } = require("../../src");

const args = process.argv.slice(1);
if (args.length < 1 || args[0] != 'start') {
    logWithColor("Use 'start' the command");
    process.exit(1);
}

deploymentController.startExecutionByOrder();


