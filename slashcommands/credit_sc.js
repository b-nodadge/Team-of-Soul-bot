const { MessageEmbed , CommandInteraction } = require('discord.js')
module.exports = {
  name: "크레딧",
  description: "봇에 대한 것들을 알려줍니다.",
  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async execute(interaction){
    const embed = new MessageEmbed()
    .setTitle("Creadit")
    .setDescription("봇에 대한 설명입니다.")
    .addFields(
        {name:"개발자",value:"[b]nodadge([b]노대지)"},
        {name:"개발환경",value:"Node.js\(16↑\), Javascrpit, Repl It, discord.js\(13.6.0\)"},
        {name:"운영환경",value:"Node.js, Javascript, Repl It, Uptime Robot"},
        {name:"연락 E-Mail",value:"\`Kakao Mail\` nodadge@kakao.com  \n  \`Naver Mail\` gilbert8767@naver.com"},
        {name:"Discord",value:"[b]nodadge\`#8117\`"})
        .setColor("#1d1e49")
        .setFooter({text: "-made by [b]nodadge#0206-"})
    await interaction.reply({embeds :[embed]})
  }
  
}