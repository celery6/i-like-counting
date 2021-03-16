module.exports = {
	name: 'count',
	cooldown: 2147483.647,
	noAdmin: false,
	execute(msg, args, client) {
		const fs = require('fs')
		const { countingChannel, ping} = require('../config.json');

		let count1 = {};
		let count2 = {};

		//DATABASE!!

		client.on('message', message => {
			fs.readFile('./theCount.json', 'utf8', (err, jsonString) => {   //check if stopped ?
				if (err) {
					console.log("theCount file read failed:", err)
				}
				try {
					jsonFile = JSON.parse(jsonString);
					const rightCount = jsonFile.theCountNow;


					const channel = message.channel;
					const pingChannel = client.channels.cache.find(pingChannel => pingChannel.id === ping);
					if (channel.id !== countingChannel) return;  //check for channel

					
					if (message.author.bot) return; //check for bot msg

					if (isNaN(message.content)) {    //check for NaN
						pingChannel.send(`bopBOP THATS NOT A NUMBER IDOT MOMENT! <@${message.author.id}> DELETE THAT ***NOW!***`);
						message.channel.send('COUNTING FAILURE!!!!!! :ytdfu6vgch: :ytdfu6vgch:  ');
						return;
					}
					
					let date = new Date(message.createdTimestamp);
					let minute = date.getMinutes();

					count2 = JSON.parse(JSON.stringify(count1)); //REPLACE BOTTOM COUNT WITH TOP COUNT

					count1.authorId = message.author.id; //GET NEWEST COUNT VALUES
					count1.content = message.content;
					count1.id = message.id;
					count1.time = minute;

					if (count1.authorId === count2.authorId) {
						pingChannel.send(`YOU CANT COUNT TWICE IN A ROW <@${message.author.id}>:-1: :angry:`);
						message.reply('DONT COUNT TWICE IN A ROW STUPID IDOT');
						return
					} 
					//CHECK IF 1 PERSON IS SPAMMING
					//___________________________________________________________________________________________________
							
							if (message.content != rightCount) {	//check for correct count
								pingChannel.send(`WTF!!!!! ***COUNTING FAILURE!*** <@${message.author.id}> PLEASE EDIT IT TO ${rightCount}AND DON'T DELETE IT!!!!!!!!!! :pleading_face: `);
								message.channel.send('COUNTING FAILURE!!!!!! :ytdfu6vgch:');
							}

							const newCount = rightCount + 1;   //add 1 to count
							console.log(`UPDATING THE COUNT TO: ${newCount}`);

							let updatedFile = {     //write count to file
								theCountNow: newCount
							};
							let data = JSON.stringify(updatedFile);
							fs.writeFileSync('theCount.json', data);

						} catch (err) {
							console.log('json string parse error', err);
						}
					
				
			})
		})
		msg.channel.send('STARTED WATCHING COUNTS YASSSS!!!');
	}
};
