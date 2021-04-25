module.exports = {
    name: 'count',
    cooldown: 2147483.647,
    noAdmin: false,
    async execute(message, client, db) {
        const { countingChannel, ping } = require('../config.json')
        if (message.channel.id !== countingChannel) return //check for channel
        if (message.author.bot) return //check for bot msg

        //increase sequence function
        async function incId(db) {
            const collection = db.collection('counters')
            const doc = await collection.findOne()
            const nextId = doc.sequence_value + 1
            const result = await collection.updateOne(
                { _id: 'sequence' },
                { $inc: { sequence_value: 1 } }
            )
            //  console.log('UPDATING ID TO!!:  ' + nextId)
            return nextId
        }

        //do counting things function
        async function run(message) {
            try {
                //check if stopped
                const stopped = await db.collection('stop').findOne()
                if (stopped.stopped === true) {
                    message.react('😱')
                    return
                }

                const current = db.collection('current')
                const currentCountDoc = await current.findOne()
                const rightCount = currentCountDoc.current

                //AHHHHHH
                const channel = message.channel
                const pingChannel = client.channels.cache.find(
                    (pingChannel) => pingChannel.id === ping
                )

                if (isNaN(message.content)) {
                    //check for NaN
                    pingChannel.send(
                        `bopBOP THATS NOT A NUMBER IDOT MOMENT! <@${message.author.id}> DELETE THAT ***NOW!***`
                    )
                    message.channel.send(
                        'COUNTING FAILURE!!!!!! :ytdfu6vgch: :ytdfu6vgch:  '
                    )
                    return
                }

                let date = new Date(message.createdTimestamp)
                let minute = date.getMinutes()

                //CHECK IF 1 PERSON IS SPAMMING
                /* if (count1.authorId === count2.authorId) {
                    pingChannel.send(
                        `YOU CANT COUNT TWICE IN A ROW <@${message.author.id}>:-1: :angry:`
                    )
                    message.reply('DONT COUNT TWICE IN A ROW STUPID IDOT')
                    return
                }*/
                if (Number(message.content) != rightCount) {
                    //check for correct count
                    pingChannel.send(
                        `WTF!!!!! ***COUNTING FAILURE!*** <@${message.author.id}> PLEASE EDIT IT TO ${rightCount}AND DON'T DELETE IT!!!!!!!!!! :pleading_face: `
                    )
                    message.channel.send('COUNTING FAILURE!!!!!! :ytdfu6vgch:')
                }
                //add count info to db
                const countDoc = {
                    _id: await incId(db),
                    content: message.content,
                    user: message.author.id,
                    timestamp: date,
                }
                console.log('dateIS  ' + date)

                await db.collection('counts').insertOne(countDoc)

                // update current count
                const newCount = rightCount + 1
                console.log('UPDATING COUNT TO ' + newCount)
                await current.updateOne(
                    { id: 'currentId' },
                    { $set: { current: newCount } }
                )
            } catch (err) {
                console.log('CAUGHT AN ERRORa!!' + err)
            }
        }

        run(message).catch(console.dir)
        //msg.channel.send('STARTED WATCHING COUNTS YASSSS!!!')
    },
}
