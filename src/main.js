const { app, BrowserWindow, ipcMain } = require("electron");
const Downloader = require("./main/downloader.js");
const {
  exeDir,
  installationDir,
  installerDir,
  tempDownloadDir,
} = require("./main/constants.js");
const { checkIfInstalled, deleteTempDir } = require("./main/utils.js");
const execFile = require("child_process").execFile;
const fs = require("fs");
const path = require("path");
const os = require("os");

let mainWindow;
let isInstalled = false;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    openDevTools: false,
    transparent: false,
    resizable: false,
    width: 1280,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("./renderer/index.html");

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  //deleteTempDir();
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("window-loaded", function (event) {
  isInstalled = checkIfInstalled();
  event.sender.send("window-loaded", isInstalled);
});

ipcMain.on("window-close", function (event) {
  mainWindow.close();
});

ipcMain.on("window-minimize", function (event) {
  mainWindow.minimize();
});

// listen for event to download
ipcMain.on("download-start", function (event) {
  event.sender.send("download-start");
  Downloader.downloadFiles();

  const updateDownloadProgress = setInterval(() => {
    const progress = Downloader.getProgress();

    event.sender.send("download-update", progress);
    if (progress === 100) {
      clearInterval(updateDownloadProgress);
      event.sender.send("download-finished");
    }
  }, 1000);

  event.sender.send("download-start", "We're downloading the game");
});

ipcMain.on("install", function (event) {
  event.sender.send("install-complete");

  if (fs.existsSync(tempDownloadDir) && fs.existsSync(installerDir)) {
    execFile(installerDir, function (err, data) {
      console.log(err);
      console.log(data.toString());
    });
  }
});

//// run install code here;

ipcMain.on("play", () => {
  if (fs.existsSync(installationDir) && fs.existsSync(exeDir)) {
    execFile(exeDir, function (err, data) {
      console.log(err);
      console.log(data.toString());
    });
  }
});
