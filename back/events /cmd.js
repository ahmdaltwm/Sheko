module.exports = async (api, event, commands) => {
  if (!event) return;
  if (!event.body) return;

  async function handleCmd() {
    const args = event.body.trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = commands.find(cmd => cmd.name === commandName || (cmd.alias && cmd.alias.includes(commandName)));
    if (!command) return;
    await command.run(api, event, commands);
    command.usage++;
  }

  handleCmd();
};