module.exports = {
  name: 'اوامر',
  alias: 'مساعدة',
  hidden: true,
  usage: 0,
  owner: 'STARK',
  version: '1.2',
  run: async (api, event, commands) => {

    const args = event.body.split(' ').slice(1);


    const itemsPerPage = 10;

    const pageNumber = parseInt(args[0], 10) || 1;


    const visibleCommands = commands.filter(command => !command.hidden);


    if (visibleCommands.length === 0) {
      api.sendMessage(
        `【警告】| لا توجد أوامر متاحة حاليًا. يرجى المحاولة لاحقًا.`,
        event.threadID, event.messageID);
      return;
    }


    const totalCommands = visibleCommands.length;
    const totalPages = Math.ceil(totalCommands / itemsPerPage);


    if (pageNumber < 1 || pageNumber > totalPages) {
      api.sendMessage(
        `【警告】| الصفحة غير موجودة. اختر رقم صفحة بين 1 و ${totalPages}.`,
        event.threadID, event.messageID);
      return;
    }


    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    const commandsList = visibleCommands.slice(startIndex, endIndex)
      .map(command => command.name).join('\n');


    const messageText = `
الأوامر المتاحة:
${commandsList}

عدد الأوامر المتاحة: ${totalCommands}
صفحة: ${pageNumber} من ${totalPages}

استخدم الرقم المناسب للانتقال بين الصفحات.
    `;

    // إرسال الرسالة للمستخدم
    api.sendMessage(messageText.trim(), event.threadID, event.messageID);
  }
}