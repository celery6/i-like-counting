module.exports = {
    name: 'guildMemberUpdate',
    execute(oldMember, newMember) {
        //Ensure nickname is not changed
        if (newMember.id !== '791546976675168297') return

        if (newMember.nickname !== "['] I REALLY LOVE COUNTING!!!") {
            newMember.setNickname("['] I REALLY LOVE COUNTING!!!")
        }
    }
}