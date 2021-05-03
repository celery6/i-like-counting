module.exports = {
    name: 'remindme',
    cooldown: 3,
    noAdmin: true,
    async execute(msg, args, client, db) {
        const reminders = db.collection('reminders')

        if (isNaN(args[0])) {
            return msg.reply(
                `i need a NUMBER OF MINUTES IDOT. *${args[0]}* is NOT A NUMBER :man_facepalming:`
            )
        }

        const userExists = await reminders.findOne({ userId: msg.author.id })
        if (userExists) {
            await reminders.updateOne(
                { userId: msg.author.id },
                { $set: { interval: args[0] } }
            )

            return msg.reply(
                `OK! updated your reminder to ${args[0]} minutes! :partying_face:`
            )
        }

        const reminderDoc = {
            userId: msg.author.id,
            interval: args[0],
            stopped: false,
        }

        await reminders.insertOne(reminderDoc)

        msg.reply(
            `ok set your reminder for every ${args[0]} miunutes! YEAH! **I LOVE COUNTING!**`
        )
    },
}
