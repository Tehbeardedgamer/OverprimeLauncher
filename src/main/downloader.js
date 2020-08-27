const request = require("request");
const fs = require("fs");
const path = require("path");

const { resolve } = require("path");

class Downloader {
  constructor() {
    this.totalReceived = 0;
    this.totalSize = 1;

    this.fileURLs = ["http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.001",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.002",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.003",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.004",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.005",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.006",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.007",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.008",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.009",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.010",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.011",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.012",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.013",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.014",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.015",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.016",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.017",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.018",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.019",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.020",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.021",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.022",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.023",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.024",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.025",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.026",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.027",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.028",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.029",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.030",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.031",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.032",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.033",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.034",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.035",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.036",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.037",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.038",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.039",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.040",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.041",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.042",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.043",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.044",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.045",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.046",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.047",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.048",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.049",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.050",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.051",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.052",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.053",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.054",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.055",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.056",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.057",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.058",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.059",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.060",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.061",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.062",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.063",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.064",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.065",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.7z.066",
    "http://CDN.tehbeardedgamer.tv/Overprime_Compiled.exe",
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
