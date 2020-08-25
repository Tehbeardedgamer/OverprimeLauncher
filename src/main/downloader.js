const request = require("request");
const fs = require("fs");
const path = require("path");

const { resolve } = require("path");

class Downloader {
  constructor() {
    this.totalReceived = 0;
    this.totalSize = 1;

    this.fileURLs = ["http://CDN.tehbeardedgamer.tv/Overprime.7z"];
  }

  downloadFiles(readFile) {
    return new Promise((resolve) => {
      for (let i = 0; i < this.fileURLs.length; i++) {
        const filename = this.getFilenameFromUrl(this.fileURLs[i]);
        const finalPath = path.join(readFile, filename);
        console.log("file path", finalPath);
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
