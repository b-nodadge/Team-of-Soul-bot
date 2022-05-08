const client = require('../index.js')
const {MessageEmbed} = require('discord.js');

module.exports = {
  name:"답장",
  async execute(message, args){
      if(message.author.id !== "507116488998518784")return;
      if(!args[0])return intents.reply('똑바로해');
      const reasonReply = args.slice(1).join(" ");
      const userId = args[0];
      const replyEmbed = new MessageEmbed()
      .setTitle('문의 답변입니다!')
      .setDescription(reasonReply)
      .setColor('AQUA')
      .setTimestamp();
      try{
          client.users.fetch(userId).then((user) => {
              user.send({embeds:[replyEmbed]});
          });
          message.reply({embeds:[replyEmbed]});
      }catch(error){
          message.reply(`오류:${error}`);
      };
  },
};
