/*INTEGRATED DEFINED CONST */
const { ipcRenderer } = require("electron");

/* USER DEFINED CONST */
const downloadBtn = document.getElementById("downloadBtn");
const buttonText = {
  DOWNLOAD: "DOWNLOAD",
  DOWNLOADING: "DOWNLOADING",
  INSTALL: "INSTALL",
  INSTALLING: "INSTALLING",
  PLAY: "PLAY",
};

/*END OF CONST - RENDERER CODE */

downloadBtn.addEventListener("click", () => {
  switch (downloadBtn.textContent) {
    case buttonText.DOWNLOAD: {
      console.log("button Clicked");
      ipcRenderer.send("iniDownload");
      console.log("IPCSENT");
      break;
    }
    case buttonText.INSTALL: {
      ipcRenderer.send("iniInstall");
      break;
    }
    case buttonText.PLAY: {
      ipcRenderer.send("iniPlay");
      break;
    }
  }
});
minimizeBtn.addEventListener("click", () => {
  ipcRenderer.send("window:minimize");
});
closeBtn.addEventListener("click", () => {
  ipcRenderer.send("window:close");
});
ipcRenderer.on("download:check", (event, isDownloaded) => {
  console.log(buttonText);
  console.log(isDownloaded);
  downloadBtn.textContent = isDownloaded
    ? buttonText.INSTALL
    : buttonText.DOWNLOAD;
});
ipcRenderer.on("install:check", (event, isInstalled) => {
  console.log(buttonText);
  console.log(isInstalled);
  downloadBtn.textContent = isInstalled ? buttonText.PLAY : buttonText.INSTALL;
});

ipcRenderer.on("download:started", (event) => {
  setButtonText(buttonText.DOWNLOADING);
  $progress.addClass("progress--active");
});

ipcRenderer.on("install:started", (event) => {
  setButtonText(buttonText.INSTALLING);
  $progress.addClass("progress--active");
});
ipcRenderer.on("install-update", function (event, progress) {
  updateProgress(progress);
});

ipcRenderer.on("download-update", function (event, progress) {
  updateProgress(progress);
});

ipcRenderer.on("download-finished", function (event) {
  setButtonText(buttonText.INSTALL);
  $progress.addClass("progress--complete");
});

ipcRenderer.on("install-complete", function (event) {
  setButtonText(buttonText.PLAY);
});

/*
PROGRESSBAR
*/
const $ = require("jquery");
const $bar = $(".progress__bar");
const $progress = $(".progress");
const $text = $(".progress__text");

const orange = 30;
const yellow = 55;
const green = 85;

const setButtonText = (text) => {
  downloadBtn.textContent = text;
};

const updateProgress = (percent) => {
  $text.find("em").text(percent + "%");

  if (percent >= 100) {
    $progress.addClass("progress--complete");
    $bar.addClass("progress__bar--blue");
    $text.find("em").text("Complete");
  } else {
    if (percent >= green) {
      $bar.addClass("progress__bar--green");
    } else if (percent >= yellow) {
      $bar.addClass("progress__bar--yellow");
    } else if (percent >= orange) {
      $bar.addClass("progress__bar--orange");
    }
  }

  $bar.css({ width: percent + "%" });
};

/**
 * attachLink(selector, link)
 * @param {string} selector The CSS Selector for the element to be clicked
 * @param {string} link The url that should be opened when the click is triggered
 */
function attachLink(selector, link) {
  document.querySelector(selector).addEventListener("click", (event) => {
    event.preventDefault();
    ipcRenderer.send("openExternalLink", link);
  });
}

// Just added a bit of documentation dont mind me

// Tada, made the code a little cleaner
attachLink(".discord", "https://discord.gg/fmWtanS");
attachLink(".paypalBtn", "https://www.paypal.com/paypalme/Tehbeardedgamer");
attachLink(".twitchBtn", "https://twitch.tv/tehbeardedgamer");
attachLink(".learn", "http://www.overprime.net");

// document.querySelectorAll('.twitchBtn').forEach((element) => {
//   element.addEventListener('click', (event) => {
//     event.preventDefault();
//     ipcRenderer.send('openExternalLink', 'https://twitch.tv/tehbeardedgamer');
//   });
// });
