const { exeDir, installationDir, tempDownloadDir } = require("./constants");
const fs = require("fs");

const checkIfInstalled = () => {
  return fs.existsSync(installationDir) && fs.existsSync(exeDir);
};

const deleteTempDir = () => {
  fs.rmdirSync(tempDownloadDir);
};

module.exports = { checkIfInstalled, deleteTempDir };
