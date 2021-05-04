const { countingChannel, ping } = require('../config.json')

//increase sequence function
async function incId(db) {
    const collection = db.collection('counters')
    const doc = await collection.findOne()
    const currentId = doc.sequence_value
    await collection.updateOne(
        { _id: 'sequence' },
        { $inc: { sequence_value: 1 } }
    )
    return { current: currentId, last: currentId - 1 }
}

module.exports = {
    async execute(message, client, db) {
        if (message.channel.id !== countingChannel) return //check for channel

        async function run(message) {
            //get ping channel
            const pingChannel = client.channels.cache.find(
                (pingChannel) => pingChannel.id === ping
            )
            //check if stopped
            const stopped = await db.collection('stop').findOne()
            if (stopped.stopped === true) {
                message.react('⚫')
                return
            }

            //check for NaN
            if (isNaN(message.content)) {
                pingChannel.send(
                    `bopBOP THATS NOT A NUMBER IDOT MOMENT! <@${message.author.id}> DELETE THAT ***NOW!***`
                )
                message.channel.send(
                    'COUNTING FAILURE!!!!!! :ytdfu6vgch: :ytdfu6vgch:  '
                )
                return
            }
            const counts = db.collection('counts')
            const current = db.collection('current')
            const currentCountDoc = await current.findOne()
            const rightCount = currentCountDoc.current

            let date = new Date(message.createdTimestamp)
            let minute = date.getMinutes()

            const ids = await incId(db)

            //CHECK IF 1 PERSON IS SPAMMING
            const lastCount = await counts.findOne({ _id: ids.last })
            if (lastCount != 'uwu') {
            } else if (message.author.id === lastCount.user) {
                pingChannel.send(
                    `YOU CANT COUNT TWICE IN A ROW <@${message.author.id}>:-1: :angry:`
                )
                const errorMsg = await message.reply(
                    'DONT COUNT TWICE IN A ROW STUPID IDOT'
                )
                const errorDoc = {
                    countId: message.id,
                    errorId: errorMsg.id,
                }
                await db.collection('errors').insertOne(errorDoc)
                return
            }

            if (Number(message.content) != rightCount) {
                //wrong number send error and record it
                pingChannel.send(
                    `WTF!!!!! ***COUNTING FAILURE!*** <@${message.author.id}> PLEASE EDIT IT TO ${rightCount}AND DON'T DELETE IT!!!!!!!!!! :pleading_face: `
                )
                const errorMsg = await message.channel.send(
                    'COUNTING FAILURE!!!!!! :ytdfu6vgch:'
                )

                const errorDoc = {
                    _id: ids.current,
                    countId: message.id,
                    errorId: errorMsg.id,
                }
                await db.collection('errors').insertOne(errorDoc)
            }

            //add count info to db
            const countDoc = {
                _id: ids.current,
                content: message.content,
                user: message.author.id,
                timestamp: date,
            }

            await counts.insertOne(countDoc)

            // update current count
            const newCount = rightCount + 1
            await current.updateOne(
                { id: 'currentId' },
                { $set: { current: newCount } }
            )
        }

        run(message).catch(console.dir)
    },
}
