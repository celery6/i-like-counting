
module.exports = {
	name: 'get',
	noAdmin: false,
	execute(message, args, client) {
		message.reply('you need help');	

        const Role = message.guild.roles.cache.find(role => role.name == "Builder");
        const Members = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == Role)).map(member => member.user.tag);
		console.log(`Users with ${Role.name}: ${Members}`);

	},
};