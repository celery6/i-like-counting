const { prefix } = require('../config.json')
const fs = require('fs')
const whitelist = ['306529453826113539', '682042083024044161'] //whitelist
const Discord = require('discord.js')

module.exports = {
    name: 'message',
    execute(message, client, db) {
        //get command stuff
        client.commands = new Discord.Collection()
        const commandFiles = fs
            .readdirSync('./commands')
            .filter((file) => file.endsWith('.js'))
        const cooldowns = new Discord.Collection()

        for (const file of commandFiles) {
            const command = require(`../commands/${file}`)
            client.commands.set(command.name, command)
        }

        //exit if bot msg
        if (message.author.bot) return

        //do counting
        const count = require('../counting/count')
        count.execute(message, client, db)

        //security response
        const security = message.content.toLowerCase().trim().split(' ')
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
                    )} more second(s) before reusing the \`${command.name
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

    }
}