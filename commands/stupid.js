const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "나는",
  description: "나는 바보 천재.",
  execute(message, args){
    if(args[0] == "바보야"){
      const embed = new MessageEmbed()
      .setTitle("그래 넌 바보야.")
      .setDescription("ㅇㅈㅇㅈ")
      .addFields(
          {name : "그 사람은 바로" , value : `${message.author}님` , inline : true}
      )
      .setColor('GREEN');
      message.reply({embeds : [embed]});
    } else if(args[0] == "천재야") {
        const embed1 = new MessageEmbed()
        .setTitle("?????")
        .setDescription("ㅈㄹ하고 \n 자빠졌네.")
        .addFields(
            {name : "그 양심 없는 사람은 바로" , value : `${message.author}님` , inline : true}
        )
        .setColor('RED');
        message.reply({embeds : [embed1]});
    }
  }
}