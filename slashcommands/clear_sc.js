const { Permissions , CommandInteraction } = require('discord.js');
module.exports = {
    name: "청소",
    description: "채팅방 메세지를 삭제합니다.",
    options: [
        {
            name: "양",
            description: "삭제할 양을 정해주세요.",
            type: "NUMBER",
            required: false
        } , {
            name: "대상",
            description: "삭제할 대상을 선택해주세요.(오류 수정중...)",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
      return interaction.reply("명령어 점검중..")
        try {
            let i = 0
            const list = []
            var user = interaction.options.getUser("대상")
            const arg = interaction.options.getNumber("양")
            if(!user) user = "NONE"
            const messagechannel = interaction.channel
            const messages = messagechannel.messages.fetch()
            const count = parseInt(arg)
            if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply("권한이 없습니다")
            if (count < 0 || count > 99) return interaction.reply("1에서 100미만의 수를 입력해주세요")
            if (user == "NONE") {
                await messagechannel.bulkDelete(count + 1).then((count) => {
                    count--
                    interaction.channel.send({ content: `${interaction.user}의 의해 ${count.size}개의 메세지를 삭제했습니다` }).then((msg) => setTimeout(() => { msg.delete() }, 1000))
                })
            } else {
                (await messages).filter((m) => {
                    if (m.author.id == user.id && count > i) {
                        console.log(m)
                        list.push(m)
                        i++
                    }
                })
                await messagechannel.bulkDelete(list + 1).then((count) => interaction.channel.send({ content: `${interaction.user}의 의해 ${user}님의 메세지를 ${count.size}개만큼 삭제하였습니다` }).then((msg) => setTimeout(() => { msg.delete() }, 2000)))
            }
        } catch (error) {
            await interaction.reply("에러가 발생했습니다")
            console.log(error)
        }
    }
}