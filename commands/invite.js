const client = require('../index.js')
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  name: "초대",
  description: "봇을 초대하는 링크입니다.",
  execute(message){
    const embed = new MessageEmbed()
      .setTitle("Invite")
      .setDescription("[ 아래 버튼을 눌러 봇을 초대해주세요! ]")
      .setColor("BLUE")
      .addFields(
        { name: '초대', value: `봇을 초대는 초대링크입니다. 버튼을 누르시면 됩니다.` }
      )
      .setTimestamp()
      .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() });

      const button = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setStyle('LINK')
            .setLabel('Invite')
            .setURL("https://discord.com/oauth2/authorize?scope=bot+applications.commands&permissions=1945627743&client_id=871300916253429790")
        )
      message.reply({embeds : [embed], components: [button]})
    }
}