module.exports = {
    name: 'whatis',
    cooldown: 0.5,
    noAdmin: true,
    execute(msg, args, client, db) {
        async function run() {
            current = db.collection('current')
            const currentCountDoc = await current.findOne()
            const currentCount = currentCountDoc.current

            msg.reply(`the next count is: ${currentCount}!!!!!!!!!!!!!!!!!!`)
        }
        run()
    },
}
