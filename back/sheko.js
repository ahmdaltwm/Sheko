const login = require('facebook-chat-api')
const log = require('./logger')
const path = require('path')
const loadCommands = require('./loadcmd')
const appStatePath = path.join(__dirname, './appstate.json')
const cmdPath = path.resolve(path.join(__dirname, './', 'commands'));

let appState;
try {
  appState = JSON.parse(fs.readFileSync(appStatePath, 'utf8'));
  log.sheko('Successfully Read AppState.\n You Ready ?');
} catch (err) {
  log.error('Failed to read app state |\n ' + err);
  process.exit(1);
}

module.exports = function startBot() {
  login({ appState: appState }, (err, api) => {
    if (err) {
      log.error('Login Failed: \n' + err);
      return;
    }
    const commands = loadCommands(cmdPath)
    listen(api, commands)
  });
}

