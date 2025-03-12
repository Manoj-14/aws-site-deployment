const { IAMPolicyCheckerStep } = require("../aws/operations/iam-operations");
const { DeploymentStepController } = require("../bin/deployment-step-controller");
const { AppDataScannerStep } = require("../scripts/cli/add-data-package");
const { AskQuestionStep } = require("../scripts/cli/package-initialisation-cmd-line-script");

const deploymentController = new DeploymentStepController();

deploymentController.addExecution(AppDataScannerStep)
deploymentController.addExecution(AskQuestionStep);
deploymentController.addExecution(IAMPolicyCheckerStep)

// console.log(deploymentController.getSteps());
// deploymentController.startExecutionByOrder();

module.exports = { deploymentController }