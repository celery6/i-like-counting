module.exports ={
    name: 'number',
	cooldown: 0,
	noAdmin: false,
    execute(msg, args, client) {
        
const inputCount = args[0];    
        //ENSURE THE ARGUMENT IS A NUMBER
        if (isNaN(args[0])) {
            return msg.channel.send('idot THATS NOT A NUMBER 23J42390420J09DF0DFUFUSU9EU90F9USFUSIOFJKL!!!!!');
        } else {
            msg.channel.send(`ok, u are at ${inputCount}`);
        }
		const fs = require('fs');

        const inputCountInteger = parseInt(inputCount,10);

        let count = { 
            theCountNow: inputCountInteger
        };
         
        let data = JSON.stringify(count);
        fs.writeFileSync('theCount.json', data);

    }

}