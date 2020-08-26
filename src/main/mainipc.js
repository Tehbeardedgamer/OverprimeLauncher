const path = require("path");
const sevenBin = require("7zip-bin");
const Seven = require("node-7z");
const { ipcMain } = require("electron");
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
  }, 100);
});

ipcMain.on("iniInstall", function (event) {
  if (fs.existsSync(readFile().gameDir)) {
    const pathTo7zip = sevenBin.path7za;

    const myStream = Seven.extractFull(getInstallExe(), readFile().gameDir, {
      $progress: true,
      $bin: pathTo7zip,
    });

    event.sender.send("install:started");

    myStream.on("data", function (data) {});

    myStream.on("progress", function (progress) {
      event.sender.send("install-update", progress.percent);
      if (progress.percent === 100) {
        event.sender.send("install-complete");
      } //? { percent: 67, fileCount: 5, file: undefinded }
    });

    myStream.on("end", function () {
      // end of the operation, get the number of folders involved in the operation
      myStream.info.get("Folders"); //? '4'
    });

    myStream.on("error", (err) => {
      console.log(err);
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
