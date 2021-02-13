module.exports = {
	name: 'whatis',
	cooldown: 0,
	noAdmin: true,
	execute(msg, args) {
		const fs = require('fs')

		//ASYNC READ FILE!!!!!!!!!!!!!!!!!!!!!
		fs.readFile('./theCount.json', 'utf8', (err, jsonString) => {
			if (err) {
				console.log("File read failed:", err)
				return
			}
			try {
				let config = JSON.parse(jsonString);
				msg.channel.send(`the next count is: ${config.theCountNow}!!!!!!!!!!!!`)
			} catch(err) {
				console.log('json string parse error',err);
			}
		})



	},
};