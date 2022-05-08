const client = require('../index.js')
const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
module.exports = {
  name:"문의",
  description: "봇 개발자에게 문의하기",
  async execute(message, args){
      const userTag = message.author.tag;
      const userId = message.author.id;
      const serverName = message.guild.name;
      const reason = args.slice(0).join(" ");
      let RReason = [];
      RReason.push(reason);
      const reasonEmbed = new MessageEmbed()
      .setTitle('확인!')
      .setDescription(`**${reason}** 이라는 문의를 전송할건가요??`)
      .setColor('AQUA')
      .setTimestamp();
      const messageButton = new MessageActionRow()
      .addComponents(
          new MessageButton()
          .setCustomId('agreeQue')
          .setLabel('네')
          .setStyle('SUCCESS')
          .setEmoji('911882666851336263'),
          new MessageButton()
          .setCustomId('disagreeQue')
          .setLabel('아니요')
          .setStyle('DANGER')
          .setEmoji('911878525466865704'),
      );
      
      const queEmbed = new MessageEmbed()
      .setTitle('문의도착!')
      .setDescription(`${RReason}`)
      .addField('문의하신분', `${userTag}(${userId})`)
      .addField('문의서버', serverName)
      .setColor('GREEN')
      .setTimestamp();
      if(!args[0])return message.reply('문의할 내용을 입력해주세요!\n사용법:?문의 <문의내용>');
      await message.reply({embeds:[reasonEmbed], components:[messageButton]});
      const collector = message.channel.createMessageComponentCollector({filter: i => i.user.id === message.author.id, time:10000});
      
      collector.on('collect', async i => {
          if(i.customId === "agreeQue"){
              try{
                client.users.fetch('507116488998518784').then((user) => {
                    user.send({embeds:[queEmbed]});
                });
              } catch(error){
                  message.reply(`오류:${error}`);
              };
              await i.update({embeds:[reasonEmbed.setTitle('완료!').setDescription('전송끝!')], components:[]});
                        }else if(i.customId === "disagreeQue"){
              await i.update({embeds:[new MessageEmbed().setTitle('취소!').setDescription('취소했습니당').setColor("RED").setTimestamp()], components:[]});
          }else{
              return;
          };
      });
  },
};