module.exports = {
    name: 'start',
    cooldown: 0.5,
    noAdmin: false,
    execute(message, args, client, db) {
        ;(async function run() {
            doc = db.collection('stop')
            await doc.updateOne({ id: 'stopId' }, { $set: { stopped: false } })
            message.channel.send('STARTED WATCHING COUNTS!! HOORAAAHHHHHHH!')
        })()
    },
}
