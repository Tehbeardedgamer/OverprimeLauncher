const request = require("request");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { tempDownloadDir } = require("./constants");

class Downloader {
  constructor() {
    this.totalReceived = 0;
    this.totalSize = 1;

    if (!fs.existsSync(tempDownloadDir)) {
      fs.mkdirSync(tempDownloadDir, { recursive: true });
      
    }

    this.fileURLs = [
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer.exe",
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-1.bin",
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-2.bin",
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-3.bin",
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-4.bin",
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-5.bin",
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-6.bin",
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-7.bin",
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-8.bin",
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-9.bin",
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-10.bin",
    ];
  }

  downloadFiles() {
    return new Promise((resolve) => {
      for (let i = 0; i < this.fileURLs.length; i++) {
        const filename = this.getFilenameFromUrl(this.fileURLs[i]);
        const finalPath = path.join(tempDownloadDir, filename);
        console.log("file path", finalPath); //did it make the dir in local?
        this.downloadFile(this.fileURLs[i], finalPath);
      }
      resolve();
    });
  }

  getFilenameFromUrl = (url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  };

  getProgress = () => {
    const percentage = (this.totalReceived * 100) / this.totalSize;
    return Math.ceil(percentage * 100) / 100;
  };

  downloadFile = (file_url, targetPath) => {
    let req = request({
      method: "GET",
      uri: file_url,
    });

    const out = fs.createWriteStream(targetPath, {});
    req.pipe(out);

    req.on("response", (data) => {
      const totalBytes = parseInt(data.headers["content-length"]);
      this.totalSize += totalBytes;
    });

    req.on("data", (chunk) => {
      this.totalReceived += chunk.length;
    });
  };
}
module.exports = new Downloader();
