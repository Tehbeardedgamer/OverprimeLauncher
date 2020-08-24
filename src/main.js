/*INTEGRATED DEFINED CONST */
const electron = require("electron");

const path = require("path");
const { BrowserWindow, app, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
/*USER DEFINED CONST */
require("./main/mainipc");
const { checkForSettingFile, checkIsInstalled } = require("./main/utilities");

let mainWindow;

/* ALL BROWSER WINDOW  */

async function createWindow() {
  mainWindow = new BrowserWindow({
    openDevTools: true,
    transparent: false,
    resizable: false,
    width: 1280,
    height: 1010,
    frame: false,
    movable: true,

    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  await checkForSettingFile();
  await mainWindow.loadFile(path.join(__dirname, "/renderer/index.html"));
}
app.whenReady().then(async () => {
  // Check if  app data / settings exist. Then set userpath to  path in settings
  autoUpdater.checkForUpdatesAndNotify();
  await createWindow();

  mainWindow.webContents.send("install:check", checkIsInstalled());
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("window:close", function (event) {
  mainWindow.close();
});

ipcMain.on("window:minimize", function (event) {
  mainWindow.minimize();
});
