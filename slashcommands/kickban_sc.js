const { CommandInteraction , MessageEmbed , Permissions , MessageActionRow , MessageSelectMenu } = require('discord.js');

module.exports = {
  name: "킥밴",
  description: "사용자를 킥(추방)하거나 밴(차단)합니다.",
  options: [
    {
      name: "대상",
      description: "이 대상에게 제재를 가합니다.",
      type: "USER",
      required: true
    }
  ],
  /**
  * @param { CommandInteraction } interaction
  */
  async execute(interaction){
    const member = interaction.options.getUser("대상");
    if(!interaction.user.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply("권한이 없습니다")
    
    const menu = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId("select")
          .setPlaceholder("옵션을 선택해주세요")
          .addOptions([{
            label:"킥",description:"추방",value:"킥"
          },{
            label:"밴",description:"영구추방",value:"밴"
          }])
      )
    let embed = new MessageEmbed()
      .setTitle("밴/킥")
      .setDescription("아래매뉴로 옵션을 선택해주세요")
      .setColor("GREEN")
      .setTimestamp(new Date())

    const sendmsg = await interaction.channel.send({ embeds : [embed] , components : [menu]})
    const embed1 = new MessageEmbed()
      .setTitle("유저를 추방함")
      .setDescription(`추방당한 유저 : ${member}\n처리자 : ${interaction.user}`)
      .setTimestamp(new Dete())
      .setColor("RED")
      .setImage("https://cdn.discordapp.com/attachments/892675661246889987/898555020163837952/oh-yeah-high-kick.gif")

    const embed2 = new MessageEmbed()
      .setTitle("유저가 밴당함")
      .setDescription(`밴당한 유저 : ${member}\n 처리자 ${interaction.user}`)
      .setTimestamp(new Date())
      .setColor("RED")
      .setImage("https://cdn.discordapp.com/attachments/892675661246889987/898554800088690758/thor-strike.gif")

    const collector = interaction.channel.createMessageComponentCollector({
      componentType:"SELECT_MENU",
      time:60000
    })
    collector.on('collect', collected =>{
      const value = collected.values[0]
      if(collected.member.id !== interaction.user.id) return 
        if(value == "킥"){
          member.kick().then().catch((error)=>{
            interaction.reply({text: `오류가 발생했습니다 ${error}`, ephemeral: true})
          })
            sendmsg.update({embeds : [embed1], components:[]})
            }
            if(value == "밴"){
                member.ban().then().catch((error)=>{
                    interaction.reply({text: `오류가 발생했습니다 ${error}`,ephemeral: true})
                })
              sendmsg.update({embeds : [embed2], components: []})
            }
        })

  }
}