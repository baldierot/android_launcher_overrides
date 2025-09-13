
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const generateMd5 = (filePath) => {
  console.log(`Generating MD5 for: ${filePath}`);
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5');
  hash.update(fileBuffer);
  return hash.digest('hex');
};

if (require.main === module) {
  const files = process.argv.slice(2);
  console.log('Files to process:', files);
  files.forEach(file => {
    if (fs.existsSync(file) && !file.endsWith('.md5')) {
      const md5 = generateMd5(file);
      const newFile = path.join(path.dirname(file), `${path.parse(file).name}.md5`);
      console.log(`Creating MD5 file: ${newFile}`);
      fs.writeFileSync(newFile, md5);
    } else {
      console.log(`Skipping: ${file}`);
    }
  });
}
