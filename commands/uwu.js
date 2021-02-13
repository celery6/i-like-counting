module.exports = {
	name: 'uwu',
	cooldown: 1000000,
	noAdmin: true,
	execute(msg, args, client) {
		msg.reply('HAPPY CHISHTISHRTMASITASMTS DAY! :HAPPY: :TREE: :CHRSTIMAS: :STORE: :flushed:');

		client.on('guildMemberUpdate', (oldMember, newMember) => {
		
			if (newMember.id !== '791546976675168297') return;
			const newNick = newMember.nickname;
			const oldNick = oldMember.nickname;
			
			if (newNick !== "['] I REALLY LOVE COUNTING!!!") {
				newMember.setNickname("['] I REALLY LOVE COUNTING!!!");
			}
		})
	}
};