const { startReminder } = require('../counting/reminders')
module.exports = {
    name: 'remindme',
    cooldown: 3,
    noAdmin: true,
    async execute(msg, args, client, db) {
        const user = msg.author.id
        const reminders = db.collection('reminders')

        if (isNaN(args[0])) {
            return msg.reply(
                `i need a NUMBER OF MINUTES IDOT. *${args[0]}* is NOT A NUMBER :man_facepalming:`
            )
        }

        //if user already set a reminder, update it and stop the old interval
        const userExists = await reminders.findOne({ userId: user })
        if (userExists) {
            const oldInterval = Number(userExists.intervalId)
            clearInterval(oldInterval)
            console.log('cleared old setinterval!!')

            await reminders.updateOne(
                { userId: user },
                { $set: { interval: args[0] } }
            )
            //then start the setinterval
            await startReminder(user, args[0], client, db)

            return msg.reply(
                `OK! updated your reminder to ${args[0]} minutes! :partying_face:`
            )
        }

        //otherwise, make new doc for the user
        const reminderDoc = {
            userId: msg.author.id,
            interval: args[0],
            stopped: false,
        }
        await reminders.insertOne(reminderDoc)

        //then start the setinterval
        await startReminder(user, args[0], client, db)

        msg.reply(
            `ok set your reminder for every ${args[0]} miunutes! YEAH! **I LOVE COUNTING!**`
        )
    },
}
