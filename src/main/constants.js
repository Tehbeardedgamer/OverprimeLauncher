const fs = require("fs");
const path = require("path");
const os = require("os");

// The games installation dir
const installationDir = "C:\\Program Files (x86)\\Overprime";

// The games .exe dir
const exeDir = path.join(
  installationDir,
  "\\Overprime\\Binaries\\Win64\\Overprime-Win64-Shipping.exe"
);

// The dir where the downloaded files get saved
const tempDownloadDir = path.join(os.tmpdir() /* , "Overprime-download" */);

// The downloaded installer dir
const installerDir = path.join(tempDownloadDir, "Overprime_Installer.exe");

module.exports = { installationDir, exeDir, tempDownloadDir, installerDir };
