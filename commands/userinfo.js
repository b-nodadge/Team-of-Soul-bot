const Discord = require('discord.js')
module.exports = {
    name:"유저정보",
    execute(message){
        if(!message.mentions.members.first()) return message.reply("유저 정보를 볼 유저를 선택해주세요")
        const user = message.mentions.members.first()
        if(!user) message.reply("해당 유저를 찾을 수 없습니다.")
        const embed = new Discord.MessageEmbed()
        const createdAt = user.user.createdAt
        embed.setColor("#1d1e49")
        embed.setTitle(`${user.user.tag} 님의 정보`)
        embed.setThumbnail(user.user.displayAvatarURL())
        embed.addField("아이디",user.user.id)
        embed.addField("가입날짜",`${createdAt.getFullYear()}년 ${createdAt.getMonth()}월 ${createdAt.getDay()}일 ${createdAt.getHours()}시 ${createdAt.getMinutes()}분`)
        return message.reply({embeds:[embed]})
    }
}   