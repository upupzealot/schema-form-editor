const { execSync } = require('child_process');

let args = process.argv.slice(2);

const uikitFlags = ['--ele', '--ant'];
let isUikitEmpty = true;
uikitFlags.forEach(flag => {
  isUikitEmpty = isUikitEmpty && !args.includes(flag);
});

const isElementUi = isUikitEmpty || process.argv.includes('--ele');
const isAntDesign = isUikitEmpty || process.argv.includes('--ant');

args = args.filter(arg => !uikitFlags.includes(arg));
let pattern = '';
if(args.length) {
  pattern = args[0];
  if(pattern.startsWith('/')) {
    pattern = `--testPathPattern=${pattern}`
  } else {
    pattern = `--testNamePattern=${pattern}`
  }
}

if(isElementUi) {
  console.log();
  execSync(`jest ${pattern} --verbose --coverage=false --config=jest-element-ui.config.js`, {
    stdio: 'inherit',
  });
}
if(isAntDesign) {
  console.log();
  execSync(`jest ${pattern} --verbose --coverage=false --config=jest-ant-design.config.js`, {
    stdio: 'inherit',
  });
}
