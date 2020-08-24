const { electron, ipcMain } = require("electron");
const fs = require("fs");
const Downloader = require("./downloader");
const {
  readFile,
  getExeDir,
  getInstallExe,
  checkIsInstalled,
} = require("./utilities");
const execFile = require("child_process").execFile;

ipcMain.on("iniDownload", (event) => {
  console.log("I heard a button click");
  Downloader.downloadFiles(readFile().gameDir);
  event.sender.send("download:started");

  const updateDownloadProgress = setInterval(() => {
    const progress = Downloader.getProgress();

    event.sender.send("download-update", progress);
    if (progress === 100) {
      clearInterval(updateDownloadProgress);
      event.sender.send("download-finished");
    }
  }, 1000);
});

ipcMain.on("iniInstall", function (event) {
  event.sender.send("install-complete");
  console.log("the FUCKING INSTALL BUTTON WAS PRESSED");
  if (fs.existsSync(readFile().gameDir)) {
    console.log(readFile().gameDir);
    execFile(getInstallExe(), function (err, data) {
      console.log(err);
      console.log(data.toString());
    });
  }
});

//// run install code here;

ipcMain.on("iniPlay", () => {
  if (checkIsInstalled()) {
    console.log(getExeDir());
    execFile(getExeDir(), function (err, data) {
      console.log(err);
      console.log(data.toString());
    });
  }
});

ipcMain.on("openExternalLink", (event, link) => {
  require("electron").shell.openExternal(link);
});
