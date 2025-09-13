
const crypto = require('crypto');
const fs = require('fs');

const generateMd5 = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5');
  hash.update(fileBuffer);
  return hash.digest('hex');
};

if (require.main === module) {
  const files = process.argv.slice(2);
  files.forEach(file => {
    if (fs.existsSync(file) && !file.endsWith('.md5')) {
      const md5 = generateMd5(file);
      fs.writeFileSync(`${file}.md5`, md5);
    }
  });
}
