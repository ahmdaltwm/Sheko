const handleCmd = require('./events/cmd')
module.exports = function listen(api, commands) {
  api.setOptions({
    listenEvents: true,
    autoMarkRead: true,
    selfListen: true
  });

  api.listenMqtt(async (err, event) => {
    if (err) return log.error(err);
    if (!event) return;

   
    switch (event.type) {
      case "message":
        log.info("Message")
      case "message_reply":
        try {
          handleCmd(api, event, commands) } catch (e) {
            api.sendMessage('|⚠️| حدث خطـا ')
          }
        break;

      case "message_reaction":
        break;

      case "message_unsend":
        break;

      case "event":
      case "change_thread_image":

        break;

      case "typ":
        break;

      case "presence":
        break;

      case "read_receipt":
        break;

      default:
        break;
    }
  });

};