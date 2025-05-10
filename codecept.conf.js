const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

// codecept.conf.js
/** @type {import('codeceptjs').CodeceptJS.Config} */
exports.config = {
  tests: './e2e/*.spec.js',
  output: './e2e/output',
  helpers: {
    Playwright: {
      url: 'http://localhost:5173',
      show: true,
      browser: 'chromium',
    },
  },
  include: {
    I: './steps_file.js',
  },
  name: 'anime-stream',
};
