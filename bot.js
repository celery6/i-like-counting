const fs = require('fs')
const Discord = require('discord.js')
const { token, uri, database } = require('./config.json')
const client = new Discord.Client()

const { MongoClient } = require('mongodb')

//mango connection
const mango = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
async function connect() {
    try {
        await mango.connect()
        console.log('CONNECTED TO MANGO!')
    } catch (err) {
        console.log('MANGO ERROR' + err)
    }
}
connect()
const db = mango.db(database)

//event handling
const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, db));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client, db));
    }
}

client.login(token)
client.once('ready', () => {
    console.log('uwu im here')
    const { onStart } = require('./counting/reminders')
    onStart(client, db)
})
