async function onStart(msg, args, client, db) {
    setInterval(() => {
        msg.channel.send(`reminding ${msg.author} to GO COUNT!`)
    }, interval)
}
