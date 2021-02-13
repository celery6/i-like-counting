module.exports = {
    name: 'stop',
	cooldown: 0,
	noAdmin: false,
    execute(message, args, client) {


        const fs = require('fs');

        let stopping = { 
            stopped: true
        };
         
        let data = JSON.stringify(stopping);
        fs.writeFileSync('stopCounting.json', data);

        message.channel.send('STOPPED WATCHING COUNTS!! SOBSOBSSOB :sob:!');

    } 
};
