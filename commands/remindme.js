const { startReminder } = require('../counting/reminders')
module.exports = {
    name: 'remindme',
    cooldown: 3,
    noAdmin: true,
    async execute(msg, args, client, db) {
        if (args[0] == null) {
            return msg.reply('NEEDS ARGUMENTS IDOT')
        }
        const user = msg.author.id
        const reminders = db.collection('reminders')
        const userDoc = await reminders.findOne({ userId: user })

        //if command is to START reminding,
        if (args[0] === 'start') {
            if (userDoc.stopped === false) {
                return msg.reply('YOUR REIMINDER IS ALREADY STARTED IDOT')
            }
            const doc = await reminders.findOne({ userId: user })

            await reminders.updateOne(
                { userId: user },
                { $set: { stopped: false } }
            )
            startReminder(user, doc.interval, client, db)
            return msg.channel.send(
                `WOOOOOOOO COUNTING REMINDERS STARTED FOR ${msg.author} :SOCOOL`
            )
        }

        //if command is to stop reminding,
        if (args[0].toLowerCase() === 'stop') {
            if (userDoc.stopped === true) {
                return msg.reply(
                    'YOU ALREADY STOPPED UR REMINDER DUMBAsDF787987'
                )
            }
            const doc = await reminders.findOne({ userId: user })
            clearInterval(Number(doc.intervalId))
            await reminders.updateOne(
                { userId: user },
                { $set: { stopped: true } }
            )
            return msg.channel.send(
                'ok paused your counting reminder for now please remember to start it soon !! :pleading_face: :pensive:'
            )
        }

        //nani
        if (isNaN(args[0])) {
            return msg.reply(
                `i need a NUMBER OF MINUTES IDOT. *${args[0]}* is NOT A NUMBER :man_facepalming:`
            )
        }

        if (args[0] > 1920 || args[0] < 5) {
            return msg.reply(
                `YOU're stupid! number must be between 5mins and 1920 mins IDOT :man_facepalming:`
            )
        }

        //if user already set a reminder, update it and stop the old interval, then start new one
        const userExists = await reminders.findOne({ userId: user })
        if (userExists) {
            const oldInterval = userExists.intervalId
            clearInterval(oldInterval)

            await reminders.updateOne(
                { userId: user },
                { $set: { interval: args[0] } }
            )
            await startReminder(user, args[0], client, db)

            return msg.reply(
                `OK! updated your reminder to ${args[0]} minutes! :partying_face:`
            )
        }

        //otherwise, make new doc for the user and start setinterval
        const reminderDoc = {
            userId: msg.author.id,
            interval: args[0],
            stopped: false,
        }
        await reminders.insertOne(reminderDoc)
        await startReminder(user, args[0], client, db)

        msg.reply(
            `ok set your reminder for every ${args[0]} miunutes! YEAH! **I LOVE COUNTING!**`
        )
    },
}
