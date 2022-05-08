const {Permissions , MessageEmbed, CommandInteraction} = require('discord.js')

module.exports = {
    name:"채널닫기",
    description: "열려있는 채널을 닫습니다.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction){
      //await interaction.delete()
      if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply("권한이 없습니다")
      interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find((e) => e.name.toLowerCase().trim() === "@everyone"),{
          SEND_MESSAGES : false,
          ADD_REACTIONS : false
      })
      const date = new Date();
      const time = Math.round(date.getTime() / 1000);

      const embed = new MessageEmbed()
      .setTitle("채널이 닫힘")
      .setDescription("일반 유저에게서 메세지보내기 , 이모지달기 권한을 제거했습니다")
      .addFields(
          {name : "채널을 닫은 관리자" , value: `<@${interaction.user.id}>` , inline:true},
          {name : "명령어가 실행된 시간", value:`<t:${time}>`,inline:true},
          {name : "채널을 다시 열고싶다면?",value : `/채널열기`,inline:true}
      )
      .setColor("RED")
      .setTimestamp(new Date())
      await interaction.channel.send({embeds : [embed]})
  }
}