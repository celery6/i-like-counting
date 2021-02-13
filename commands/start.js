module.exports = {
    name: 'start',
	cooldown: 0,
	noAdmin: false, 
    execute(message, args, client) {

        const fs = require('fs');

        let starting = { 
            stopped: false
        };
         
        let data = JSON.stringify(starting);
        fs.writeFileSync('stopCounting.json', data);

        message.channel.send('STARTED WATCHING COUNTS!! HOORAAAHHHHHHH!');
    } 


};
