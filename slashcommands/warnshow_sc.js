const { CommandInteraction , MessageEmbed , Permissions } = require('discord.js')

module.exports = { 
  name: "처벌",
  description: "처벌를 안내합니다(부여 아닙니다.)",
  options: [{
    name: "처벌대상자",
    description: "처벌 받을 대상자",
    type: "USER",
    required: false
  } , {
    name: "처벌사유",
    description: "처벌사유(없으면 띄어쓰기로 남기기)",
    type: "STRING",
    required: false
  } , {
    name: "뮤트시간",
    description: "타임아웃 시킨 시간을 골라주세요.",
    type: "STRING",
    choices: [
      {
        name: "0분",
        value: "0min"
      } , {
        name: "1분",
        value: "1min"
      } , {
        name: "5분",
        value: "5min"
      } , {
        name: "10분",
        value: "10min"
      } , {
        name: "1시간",
        value: "1hour"
      } , {
        name: "1일",
        value: "1day"
      } , {
        name: "1주",
        value: "1week"
      }
    ],
    required: false
  } , {
    name: "경고횟수",
    description: "경고 부여 횟수",
    type: "NUMBER",
    required: false
  } , {
    name: "킥여부",
    description: "킥 여부를 알려주세요.",
    type: "STRING",
    choices: [
      {
        name: "Yes",
        value: "YES"
      } , {
        name: "No",
        value: "NO"
      }
    ],
    required: false
  } , {
    name: "밴여부",
    description: "밴 여부를 알려주세요.",
    type: "STRING",
    choices: [
      {
        name: "Yes",
        value: "YES"
      } , {
        name: "No",
        value: "NO"
      }
    ], 
    required: false
  }],
  /**
  * @param {CommandInteraction} interaction
*/
  async execute(interaction){
    //await interaction.delete() 
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply("권한이 없습니다")
    const puser= interaction.options.getUser("처벌대상자")
    var pdesc = interaction.options.getString("처벌사유") 
    const mutet = interaction.options.getString("뮤트시간")
    const warnc = interaction.options.getNumber("경고횟수")
    const kickyn = interaction.options.getString("킥여부")
    const banyn = interaction.options.getString("밴여부")

    if(!pdesc || pdesc === " ") pdesc = "NONE"

   const embed = new MessageEmbed()
      .setTitle(`처벌 대상 : <@${puser.id}>(${puser.tag})`)
      .setDescription(`사유 : ${pdesc}`)
      .addFields(
        { name: "처벌들" , value: `뮤트 : ${mutet} | 경고 : ${warnc}회\n킥 : ${kickyn} | 밴 : ${banyn}` }
      )
      .setColor('RED')
      .setFooter({text:`관리자 : ${interaction.user.tag} | 관리자ID : ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL()})
      .setTimestamp(new Date())
      .setAuthor({name: `대상 : ${puser.tag} | 대상ID : ${puser.id}`, iconURL: puser.displayAvatarURL()})
      await interaction.channel.send({embeds: [embed]})
  }
}
