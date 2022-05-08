const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "크레딧",
  description: "봇에 대한 것들을 알려줍니다.",
  execute(message){
    const embed = new MessageEmbed()
    .setTitle("Creadit")
    .setDescription("봇에 대한 설명입니다.")
    .addFields(
        {name:"개발자",value:"[b]nodadge([b]노대지)"},
        {name:"개발환경",value:"Node.js, Javascrpit, Microsoft Visual Studio Code, Repl It"},
        {name:"운영환경",value:"Node.js, Javascript, Repl It, Uptime Robot"},
        {name:"연락 E-Mail",value:"nodadge@kakao.com \`Kakao Mail\` \n gilbert8767@naver.com \`Naver Mail\`"},
        {name:"Discord",value:"[b]nodadge\`#0206\`"},
        {name:"개발에 도움을 준 분들",value:"B_ang\`#2177\` \n 흰곰\`#5517\`"})
        .setColor("#1d1e49")
        .setAuthor({text: "Team of Soul - 봇"})
        .setFooter({text: "-made by [b]nodadge#0206-"})
    message.reply({embeds :[embed]})
  }
  
}