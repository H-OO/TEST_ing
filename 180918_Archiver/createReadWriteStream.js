const fs = require('fs');
const readStream = fs.createReadStream(__dirname + '/1.txt');
const writeStream = fs.createWriteStream(__dirname + '/2.txt');
readStream.on('data', (data) => {
  console.log(data);
  writeStream.write(data);
});