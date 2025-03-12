const { Step } = require("../../bin/step");

const getPackageJsonFile = async () => {
    const appFolder = process.cwd();
    if (!fsBase.existsSync(`${appFolder}/package.json`)) {
        logWithColor("Package.json not found make sure it is node framework");
        process.exit(1);
    }
    const packageData = await readFile(`${appFolder}/package.json`).then(fileData => JSON.parse(fileData));
    writeEnvFile("APP_NAME", packageData.name);
}

const AppDataScannerStep = new Step("App Data Scanner Step", getPackageJsonFile);

module.exports = { AppDataScannerStep }