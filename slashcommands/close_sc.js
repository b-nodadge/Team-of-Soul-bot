const { CommandInteraction, MessageEmbed, ThreadManager } = require('discord.js')

module.exports = {
    name: "닫기",
    description: '질문 스레드를 닫을때 사용해주세요!',
    /**
     * @param { CommandInteraction } Interaction
     */

    async execute(interaction){
        const thread = interaction.channel.parent.threads.cache.find(x => x.name === interaction.channel.name);

        if(!interaction.channel.isThread()) {
            return interaction.reply({content: "해당 명령어는 스레드에서만 사용하실 수 있어요!", ephemeral: true})
        }

        let embed = new MessageEmbed()
        .setTitle("질문 스레드 종료")
        .setDescription("질문 스레드가 종료되었어요!")
        .addField("질문자", interaction.member.user.username, true)
        .setColor("#b989d5")
        .setTimestamp(new Date())
        .setFooter({text: `닫는 사람 : ${interaction.user.tag} ` , iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({embeds: [embed]})
        try{
          await thread.setLocked(true)
        } catch(error){
          await interaction.reply({content :`오류 : ${error}`, ephemeral : true})
        }
    }
}