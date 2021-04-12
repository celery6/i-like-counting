module.exports = {
  name: "get",
  noAdmin: false,
  execute(msg, args, client) {
    msg.reply("you need help");

    msg.reply(`'` + msg.id + `'`);
  },
};
