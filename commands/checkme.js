const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "인증",
    description: "인증하기(등록된 서버만 가능 | 등록 문의는 명령어로) 점검중...",
    execute(message) {
        if (message.channel.type !== "GUILD_TEXT") return
        //return message.reply("점검중...")
      if(message.guild.id !== '959788636688228372') return message.reply("등록된 서버가 아닙니다.")
        const url = "https://remapi.xyz:2/captcha"
        try {
            fetch(url).then(res => res.json()).then(async json => {
                const embed = new MessageEmbed()
                    .setTitle("아래코드를 입력해주세요 제한시간 : 30초")
                    .setImage(json.img)
                    .setColor("BLUE")

                const msg = await message.channel.send({ embeds: [embed] })

                try {
                    const filter = (m) => {
                        if (m.author.bot) return;
                        if (m.author !== message.author) return;
                        if (m.content === json.value) return true;
                        else m.react("😒")
                    };

                    const response = await msg.channel.awaitMessages({
                        filter,
                        max: 1,
                        time: 30000,
                        errors: ['time']
                    });
                    if (response){
                      if(message.guild.id === '959788636688228372') {
                        message.member.roles.add("959788636688228373")
                      }
                      message.channel.send({ content: "인증에 성공했습니다" })
                    }
                } catch (error) {
                    message.reply("시간초과")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}