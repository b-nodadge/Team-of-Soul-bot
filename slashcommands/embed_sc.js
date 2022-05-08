const { CommandInteraction , MessageEmbed } = require('discord.js')

module.exports = { 
  name: "임베드생성",
  description: "임베드를 생성합니다",
  options: [{
    name: "제목",
    description: "임베드 제목",
    type: "STRING",
    required: "false"
  } , {
    name: "설명",
    description: "임베드 설명",
    type: "STRING",
    required: false
  } , {
    name: "필드이름",
    description: "임베드 필드 이름",
    type: "STRING",
    required: false
  } , {
    name: "필드값",
    description: "필드 값입니다.",
    type: "STRING",
    required: false
  }],
  /**
  * @param {CommandInteraction} interaction
*/
  async execute(interaction){
    //await interaction.delete()
    const title = interaction.options.getString("제목")
    const desc = interaction.options.getString("설명") 
    const fname = interaction.options.getString("필드이름")
    const fvalue = interaction.options.getString("필드값")
    if(!fname && !fvalue){
      const noembed = new MessageEmbed()
      .setTitle(`${title}`)
      .setDescription(`${desc}`)
      .setColor('RANDOM')
      .setFooter({text:`${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
      .setTimestamp(new Date())
      interaction.channel.send({embeds: [noembed]})
    } else{
      const yesembed = new MessageEmbed()
      .setTitle(`${title}`)
      .setDescription(`${desc}`)
      .addFields(
        { name: `${fname}` , value: `${fvalue}` }
      )
      .setColor('RANDOM')
      .setFooter({text:`${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
      .setTimestamp(new Date())
      await interaction.channel.send({embeds: [yesembed]})
    }
  }
}