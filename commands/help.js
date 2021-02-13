module.exports = {
	name: 'last',
	noAdmin: true,
	execute(message, args, client) {
		const pingChannel = client.channels.cache.find(pingChannel => pingChannel.id === '791923499022286868')
		pingChannel.send(message)		
	},
};