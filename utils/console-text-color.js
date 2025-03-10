const logWithColor = (text, color = "black") => {
    const colors = { red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', reset: '\x1b[0m' }
    switch (color) {
        case "red": console.log(colors.red + " " + text + " " + colors.reset); break;
        case "green": console.log(colors.green + " " + text + " " + colors.reset); break;
        case "yellow": console.log(colors.yellow + " " + text + " " + colors.reset); break;
        default: console.log(text); break;
    }
}
module.exports = { logWithColor };