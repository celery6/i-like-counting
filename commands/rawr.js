const animals = require('random-animals-api')

module.exports = {
    name: 'rawr',
    cooldown: 0.5,
    noAdmin: true,
    execute(msg, args, client, db) {
        animals
            .cat()
            .then((url) => msg.reply(url))
            .catch((error) => console.error(error))
    },
}
