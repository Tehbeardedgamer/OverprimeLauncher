const { ipcRenderer } = require("electron");
const $ = require("jquery");

const downloadBtn = document.getElementById("downloadBtn");
const closeBtn = document.getElementById("closeBtn");
const minimizeBtn = document.getElementById("minimizeBtn");

const $bar = $(".progress__bar");
const $progress = $(".progress");
const $text = $(".progress__text");

const buttonText = {
  DOWNLOADING: "DOWNLOADING",
  DOWNLOAD: "DOWNLOAD",
  INSTALL: "INSTALL",
  PLAY: "PLAY",
};

downloadBtn.addEventListener("click", function () {
  switch (downloadBtn.textContent) {
    case buttonText.DOWNLOAD: {
      ipcRenderer.send("download-start");
      break;
    }
    case buttonText.INSTALL: {
      ipcRenderer.send("install");
      break;
    }
    case buttonText.PLAY: {
      ipcRenderer.send("play");
      break;
    }
  }
});

closeBtn.addEventListener("click", () => {
  ipcRenderer.send("window-close");
});

minimizeBtn.addEventListener("click", () => {
  ipcRenderer.send("window-minimize");
});

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

window.addEventListener("load", () => ipcRenderer.send("window-loaded"));

ipcRenderer.on("download-start", function (event) {
  setButtonText(buttonText.DOWNLOADING);
  $progress.addClass("progress--active");
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

ipcRenderer.on("window-loaded", function (event, isInstalled) {
  setButtonText(isInstalled ? buttonText.PLAY : buttonText.DOWNLOAD);
});
