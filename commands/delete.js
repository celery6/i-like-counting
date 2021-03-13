module.exports = {
	name: 'delete',
	noAdmin: false,
	execute(msg, args, client) {
		msg.delete();
		msg.reply('HHI DAD <@682042083024044161>');
	}
};