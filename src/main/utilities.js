/*INTEGRATED DEFINED CONST */
const { dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");

/*USER DEFINED CONST */
const appDataFolder = path.join(os.homedir(), "AppData/Roaming/Middlend/");
const appDataSettings = path.join(appDataFolder, "settings.json");
const checkForSettingFile = async () => {
  // auto deletes the folder so you dont have to, remove when you dont need this anymore
  //   if (fs.existsSync(appDataFolder)) {
  //     fs.rmdirSync(appDataFolder, { recursive: true });
  //   }

  if (!fs.existsSync(appDataFolder)) {
    fs.mkdirSync(appDataFolder, { recursive: true });

    let options = {
      properties: ["openDirectory"],
      title: "Choose install location",
      message:
        "Hello! This must be a fresh install. Please choose the install location for OverPrime.",
    };
    await dialog.showMessageBox(options);

    const selectedDir = await dialog.showOpenDialog(options);

    if (selectedDir.canceled) {
      console.log(
        "You fucking idiot. How are you supposed to download the files if you dont select a location?"
      );
    } else {
      const settings = {
        gameDir: selectedDir.filePaths[0],
      };

      fs.writeFileSync(appDataSettings, JSON.stringify(settings, null, 2));

      return selectedDir.filePaths[0];
    }
  }
};
/////////////////////////////////////////////////////////////////////////////

const readFile = () => {
  return JSON.parse(fs.readFileSync(appDataSettings));
};

const getExeDir = () => {
  const { gameDir } = readFile();

  return path.join(
    gameDir,
    "\\Overprime_Compiled\\Overprime\\Binaries\\Win64\\Overprime-Win64-Shipping.exe"
  );
};
const getInstallExe = () => {
  const { gameDir } = readFile();

  return path.join(gameDir, "\\Overprime_Compiled.7z.001");
};

const checkIsInstalled = () => fs.existsSync(getExeDir());
const checkIsDownloaded = () => fs.existsSync(getInstallExe());
module.exports = {
  checkIsDownloaded,
  checkForSettingFile,
  checkIsInstalled,
  readFile,
  getExeDir,
  getInstallExe,
};
