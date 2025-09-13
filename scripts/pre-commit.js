
const { execSync } = require('child_process');

const stagedFiles = execSync('git diff --cached --name-only --diff-filter=A').toString().split('\n').filter(file => file);

stagedFiles.forEach(file => {
  if (file.endsWith('.pck')) {
    const newFile = file.slice(0, -4);
    execSync(`mv "${file}" "${newFile}"`);
    execSync(`git add "${newFile}"`);
    execSync(`git reset -- "${file}"`);
  }
});
