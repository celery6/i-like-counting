module.exports = {
  name: "die",
  noAdmin: false,
  execute(msg, args, client, con) {
    // q = `use uwu; insert into counts (msgId, msg, user) values (${msg.id}, ${msg.contents}, ${msg.author.id});`;

    var q = `insert into counts (msgId, msg, user) values (\\\"${msg.id}\\\", \\\"${args[0]}\\\",\\\"${msg.author.id}\\\"); `;
    q = q.replace(/\\"/g, '"');

    con.query("use uwu;", function (err, result) {
      // QUERY
      if (err) throw err;
      msg.reply("Result: " + result);
    });

    con.query(q, (err, result) => {
      if (err) throw err;
      msg.reply("result:" + result);
    });
  },
};
