const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "접속기기",
    description: "유저의 접속기기를 보여줍니다.",
    execute(message) { 
        let devices = []
        const user = message.mentions.members.first() || message.member; 
        if (!user.presence) return message.reply("유저가 오프라인입니다.");
        let status = user.presence.clientStatus;

        if (status.desktop) { 
            devices.push("컴퓨터");
        }

        if (status.mobile) { 
            devices.push("모바일");
        }

        if (status.web) { 
            devices.push("웹");
        }

        devices = devices.join(', ');

        const embed = new MessageEmbed()
            .setTitle(`${user.tag || user.user.tag}`)
            .setDescription(`[ ${devices} ]`)
            .setColor("RANDOM")
            .setTimestamp()

        message.channel.send({ embeds: [embed] });
    }
}
