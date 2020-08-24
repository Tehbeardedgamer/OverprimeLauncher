const request = require("request");
const fs = require("fs");
const path = require("path");

const { resolve } = require("path");

class Downloader {
  constructor() {
    this.totalReceived = 0;
    this.totalSize = 1;

    this.fileURLs = [
      "http://CDN.tehbeardedgamer.tv/OP_Compiled.exe",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-1.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-2.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-3.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-4.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-5.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-6.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-7.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-8.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-9.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-10.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-11.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-12.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-13.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-14.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-15.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-16.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-17.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-18.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-19.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-20.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-21.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-22.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-23.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-24.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-25.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-26.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-27.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-28.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-29.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-30.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-31.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-32.bin",
      "http://CDN.tehbeardedgamer.tv/OP_Compiled-33.bin",
    ];
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
