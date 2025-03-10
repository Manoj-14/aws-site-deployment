const { PermissionError } = require("../errors/errors");
const permissions = require("../data/permission-policies.json");
const { iamClient } = require("../config-clients/aws-config-client");
const { ListAttachedUserPoliciesCommand } = require("@aws-sdk/client-iam");
const { Step } = require("../bin/step");
const { logWithColor } = require("../utils/console-text-color");
require("dotenv").config();

const checkAccessOf = (deploymentType) => {
    var accessPermissions = [];
    switch (deploymentType) {
        case "Ec2Deployment":
            accessPermissions = permissions["aws-ec2-git-deployment"].permissions;
            break;
        case "Ec2S3Deployment":
            accessPermissions = permissions["aws-ec2-s3-deployment"].permissions;
            break;
        default:
            throw new Error("Please provide the deployment type");
    }
    return function (policiesAttached = []) {
        return accessPermissions.some((policies) => {
            return policies.every((policy) => {
                logWithColor(`Checking for policy ${policy}...`, "yellow");
                if (policiesAttached.includes(policy)) {
                    logWithColor(`${policy} permission granted`, "green");
                    return true;
                }
                else {
                    logWithColor(`${policy} permission denid!`, "red");
                }
            });
        })
    }
}

const getPoliciesAttached = async (iamClient, username) => {
    const data = await iamClient.send(new ListAttachedUserPoliciesCommand({ UserName: username })).then((data) => {
        return data.AttachedPolicies.map((policy) => policy.PolicyName)
    })
    return data;
}

const IAMPolicyVerificationStep = async () => {
    const { AWS_USERNAME: username, DEPLOYMENT_TYPE: deploymentType } = process.env;
    const [userAccessPolicies, getPolicyComparision] = await Promise.all([
        getPoliciesAttached(iamClient, username),
        checkAccessOf(deploymentType)
    ])
    return getPolicyComparision(userAccessPolicies);
}

const IAMPolicyCheckerStep = new Step("Iam Policy Checker", IAMPolicyVerificationStep);
IAMPolicyCheckerStep.execute();

module.exports = { IAMPolicyCheckerStep }