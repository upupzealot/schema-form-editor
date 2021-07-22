const { execSync } = require('child_process')

const isElementUi = process.argv.length === 2 || process.argv.includes('ele');
const isAntDesign = process.argv.length === 2 || process.argv.includes('ant');
if(isElementUi) {
  console.log();
  execSync('jest --verbose --coverage=false --config=jest-element-ui.config.js', {
    stdio: 'inherit',
  });
}
if(isAntDesign) {
  console.log();
  execSync('jest --verbose --coverage=false --config=jest-ant-design.config.js', {
    stdio: 'inherit',
  });
}
