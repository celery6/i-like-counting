const { ping } = require('../config.json')

async function startReminder(userId, interval, client, db) {
    const pingChannel = client.channels.cache.find(
        (pingChannel) => pingChannel.id === ping
    )
    const intervalId = setInterval(() => {
        pingChannel.send(`reminding <@${userId}> to GO COUNT!`)
    }, interval * 60000)

    await db
        .collection('reminders')
        .updateOne(
            { userId: userId },
            { $set: { intervalId: `${intervalId}` } }
        )
}

//on startup: go thru each doc in collection and start a setinterval for each
async function onStart(client, db) {
    reminders = db.collection('reminders')
    const docs = reminders.find()

    docs.forEach((doc) => {
        if (doc.userId == null) {
            return
        }
        const stopped = doc.stopped
        if (stopped) return

        startReminder(doc.userId, doc.interval, client, db)
    })

    console.log('reminding started!')
}

module.exports = { onStart, startReminder }
