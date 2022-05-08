const { CommandInteraction, MessageEmbed } = require('discord.js')
module.exports = {
    name:"유저정보",
    description: "유저의 정보를 보여줍니다.",
    options: [
      {
        name: "유저",
        description: "해당 유저의 정보를 보여줍니다.",
        type: "USER",
        required: true
      }
    ],
  /**
  * @param { CommandInteraction } interaction
  */
    async execute(interaction){
        const user = interaction.options.getUser("유저")
        const embed = new MessageEmbed()
        const createdAt = user.createdAt
        embed.setColor("#1d1e49")
        embed.setTitle(`${user.tag} 님의 정보`)
        embed.setThumbnail(user.displayAvatarURL())
        embed.addField("아이디",user.user.id)
        embed.addField("가입날짜",`${createdAt.getFullYear()}년 ${createdAt.getMonth()}월 ${createdAt.getDay()}일 ${createdAt.getHours()}시 ${createdAt.getMinutes()}분`)
        embed.setTimestamp(new Date())
        await interaction.reply({embeds:[embed]})
    }
}   