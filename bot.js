const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token, uri, database } = require('./config.json')
const client = new Discord.Client()
client.commands = new Discord.Collection()
const whitelist = ['306529453826113539', '682042083024044161'] //whitelist
const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'))
const cooldowns = new Discord.Collection()
const { MongoClient } = require('mongodb')

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

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

client.on('message', (message) => {
    if (message.author.bot) return //exit if bot msg
    //do counting
    const count = client.commands.get('count')
    count.execute(message, client, db)

    const security = message.content.toLowerCase().trim().split(' ') //security response
    if (security.includes('name') && security.includes('school')) {
        return message.reply(
            'MY NAME IS "BOTBOT", I ATTEND OTHER SECONDARY SCHOOL'
        )
    }

    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        )

    if (!command) return

    if (command.noAdmin === false) {
        //check whitelist
        if (!whitelist.includes(message.author.id)) {
            //If person is not authorized, send msg
            const emoji = client.emojis.cache.get('801510839386374214')
            message.reply(
                `HA ur not permitted to use this lOLLOLOLLOLO FAILURE ${emoji}`
            )
            return
        }
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = command.cooldown * 1000

    if (timestamps.has(message.guild.id)) {
        const expirationTime = timestamps.get(message.guild.id) + cooldownAmount

        if (now < expirationTime) {
            if (command.name === 'count')
                return message.reply('ALREADY COUNTING IDOT')

            const timeLeft = (expirationTime - now) / 1000
            return message.reply(
                `please wait ${timeLeft.toFixed(
                    1
                )} more second(s) before reusing the \`${
                    command.name
                }\` command.`
            )
        }
    }

    timestamps.set(message.guild.id, now)
    setTimeout(() => timestamps.delete(message.guild.id), cooldownAmount)

    try {
        command.execute(message, args, client, db)
    } catch (error) {
        console.error(error)
        message.reply('ERROR HAPPENED IDOT!')
    }
})

client.login(token)
client.once('ready', () => {
    console.log('uwu im here')
})
