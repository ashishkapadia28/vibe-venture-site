const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

const replaceInFiles = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInFiles(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      
      // Revert padding
      content = content.replace(/px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48/g, 'px-8 md:px-16 lg:px-24 xl:px-32');
      
      // Revert max width
      content = content.replace(/max-w-7xl 2xl:max-w-\[1440px\]/g, 'max-w-none');
      
      if (original !== content) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Reverted ' + file);
      }
    }
  }
};

replaceInFiles(componentsDir);
