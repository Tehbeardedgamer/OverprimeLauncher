const request = require("request");
const fs = require("fs");

let totalSize = 0;
let totalReceived = 0;

function downloadFile(file_url, targetPath) {
  let received_bytes = 0;
  let total_bytes = 0;

  let req = request({
    method: "GET",
    uri: file_url,
  });
  let out = fs.createWriteStream(targetPath);
  req.pipe(out);

  req.on("response", function (data) {
    total_bytes = parseInt(data.headers["content-length"]);
    totalSize += total_bytes;
  });

  req.on("data", function (chunk) {
    received_bytes += chunk.length;
    totalReceived += chunk.length;

    showProgress(totalReceived, totalSize);
  });

  req.on("end", function () {
    console.log("File successfully downloaded");
  });
}

// test full download looking at 100% output.
function showProgress(received, total) {
  let percentage = (received * 100) / total;
  console.log(
    Math.ceil(percentage * 100) / 100 +
      "% | " +
      received +
      "bytes out of" +
      total +
      "bytes"
  );
}

let fileURL = [
  {
    url: "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer.exe",
  },
  {
    url:
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-1.bin",
  },
  {
    url:
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-2.bin",
  },
  {
    url:
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-3.bin",
  },
  {
    url:
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-4.bin",
  },
  {
    url:
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-5.bin",
  },
  {
    url:
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-6.bin",
  },
  {
    url:
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-7.bin",
  },
  {
    url:
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-8.bin",
  },
  {
    url:
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-9.bin",
  },
  {
    url:
      "https://oprimebkt.s3.us-east-2.amazonaws.com/Overprime_Installer-10.bin",
  },
];

for (let i = 0; i < fileURL.length; i++) {
  let filename = getFilenameFromUrl(fileURL[i].url);
  let downloadsFolder = "C:\\Users\\Sdwen\\Downloads";
  let finalPath = downloadsFolder + "\\" + filename;

  downloadFile(fileURL[i].url, finalPath);
}

function getFilenameFromUrl(url) {
  return url.substring(url.lastIndexOf("/") + 1);
}
