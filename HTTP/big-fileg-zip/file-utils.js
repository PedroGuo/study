const fs = require("fs");
const writeStream = fs.createWriteStream(__dirname + "/big-file.txt");
for (let i = 0; i <= 1e5; i++) {
writeStream.write(`${i} hello! 我是大文件生成器生成器产物，大小可能为：5M\n`, "utf8");
}
writeStream.end();