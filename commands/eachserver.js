const client = require('../index.js');

module.exports = {
  name: "서버",
  description: "봇이 있는 서버 리스트(봇 주인만 가능)",
  async execute(message,args){
    if(args[0] === "리스트"){
      if(message.author.id !== '507116488998518784') return message.reply("권한이 없습니다.");
      message.react('911882666851336263')
      client.guilds.cache.forEach(guild => {
        try{
          message.channel.send(`서버 이름 : ${guild.name} | 서버 아이디 : ${guild.id} | 서버 소유자 이름 : <@${guild.ownerId}> | 서버 소유자 아이디 : ${guild.ownerId}`);
        } catch(err){
          console.log(err)
        }
      })
    } else if(args[0] === "소유자"){
      if(message.author.id !== '507116488998518784') return message.reply("권한이 없습니다.");
      message.react('911882666851336263')
        client.guilds.cache.forEach(guild => {
          try{
            client.users.fetch(guild.ownerId).then((user) => {
              user.send(`현재 13버전으로 각 서버에 계신 소유자님분께 DM메세지를 보내고 있습니다. 님은 현재 \n**${guild.name}**\n서버의 소유자시군요. 메세지가 DM으로 오셨다면 자기 서버에서 \"?문의 테스트 성공\"으로 문의를 주세요.`)
                });
              } catch(error){
                  message.reply(`오류:${error}`);
              };
    });
    } else{
      message.reply("뒤에 인수는 \"리스트\" \"소유자\"")
    }
  }
}