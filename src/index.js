const { IAMPolicyCheckerStep } = require("../aws/operations/iam-operations");
const { DeploymentStepController } = require("../bin/deployment-step-controller");
const { AskQuestionStep } = require("../scripts/cli/package-initialisation-cmd-line-script");

const deploymentController = new DeploymentStepController();

deploymentController.addExecution(AskQuestionStep);
deploymentController.addExecution(IAMPolicyCheckerStep)

console.log(deploymentController.getSteps());
deploymentController.startExecutionByOrder();