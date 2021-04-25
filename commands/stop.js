module.exports = {
    name: 'stop',
    cooldown: 0.5,
    noAdmin: false,
    execute(message, args, client, db) {
        ;(async function run() {
            doc = db.collection('stop')
            await doc.updateOne({ id: 'stopId' }, { $set: { stopped: true } })
            message.channel.send('STOPPED WATCHING COUNTS!! SOBSOBSSOB :sob:!')
        })()
    },
}
