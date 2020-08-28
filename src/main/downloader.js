const request = require("request");
const fs = require("fs");
const path = require("path");

const { resolve } = require("path");

class Downloader {
  constructor() {
    this.totalReceived = 0;
    this.totalSize = 1;
    
    this.fileURLs = ["https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.001",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.002",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.003",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.004",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.005",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.006",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.007",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.008",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.009",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.010",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.011",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.012",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.013",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.014",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.015",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.016",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.017",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.018",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.019",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.020",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.021",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.022",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.023",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.024",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.025",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.026",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.027",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.028",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.029",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.030",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.031",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.032",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.033",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.034",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.035",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.036",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.037",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.038",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.039",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.040",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.041",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.042",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.043",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.044",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.045",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.046",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.047",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.048",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.049",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.050",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.051",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.052",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.053",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.054",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.055",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.056",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.057",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.058",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.059",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.060",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.061",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.062",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.063",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.064",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.065",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.7z.066",
    "https://s3.wasabisys.com/overprime/Overprime_Compiled.exe",
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
