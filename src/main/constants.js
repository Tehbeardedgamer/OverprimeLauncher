const path = require("path");

const filePath = require("../renderer/index.js");
// The games installation dir
const installationDir = filePath;

// The games .exe dir
const exeDir = path.join(
  installationDir,
  "\\Overprime\\Binaries\\Win64\\Overprime-Win64-Shipping.exe"
);

// The dir where the downloaded files get saved
const tempDownloadDir = filePath;

// The downloaded installer dir
const installerDir = path.join(tempDownloadDir, "OP_Compiled.exe");

module.exports = { installationDir, exeDir, tempDownloadDir, installerDir };
