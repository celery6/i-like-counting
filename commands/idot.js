module.exports = {
    name: 'idot',
    noAdmin: false,
    execute(message, args, client) {
        message.delete();
        idot = message.guild.members.cache.get(args[0]);
        idot.ban();
    }
};