module.exports = {
    name: 'number',
    cooldown: 0,
    noAdmin: false,
    execute(msg, args, client, db) {
        const inputCount = Number(args[0])

        if (isNaN(args[0])) {
            return msg.channel.send(
                'idot THATS NOT A NUMBER 23J42390420J09DF0DFUFUSU9EU90F9USFUSIOFJKL!!!!!'
            )
        }

        ;(async function () {
            const current = db.collection('current')
            await current.updateOne(
                { id: 'currentId' },
                { $set: { current: inputCount } }
            )
            msg.channel.send(`ok, u are at ${inputCount}`)
        })()
    },
}
