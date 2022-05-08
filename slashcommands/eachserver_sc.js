const client = require('../index.js');
const { CommandInteraction } = require('discord.js')

module.exports = {
  name: "서버",
  description: "봇이 있는 서버 리스트(봇 주인만 가능)",
  options: [
    {
      name: "종류",
      description: "다음중에 고르세요.",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "리스트",
          value: "list"
        } , {
          name: "소유자",
          value: "owner"
        }
      ]
    }
  ],
  /**
  * @param { CommandInteraction } interaction
  */
  async execute(interaction){
    const ag = interaction.options.getString("종류")
    if(ag === "list"){
      if(interaction.user.id !== '507116488998518784') return interaction.reply("권한이 없습니다.");
      client.guilds.cache.forEach(guild => {
        try{
           interaction.channel.send(`서버 이름 : ${guild.name} | 서버 아이디 : ${guild.id} | 서버 소유자 이름 : <@${guild.ownerId}> | 서버 소유자 아이디 : ${guild.ownerId}`);
        } catch(err){
          console.log(err);
        }
      })
    } else if(ag === "owner"){
      if(interaction.user.id !== '507116488998518784') return interaction.reply("권한이 없습니다.");
        client.guilds.cache.forEach(guild => {
          try{
            client.users.fetch(guild.ownerId).then((user) => {
              user.send(`현재 13버전으로 각 서버에 계신 소유자님분께 DM메세지를 보내고 있습니다. 님은 현재 \n**${guild.name}**\n서버의 소유자시군요. 메세지가 DM으로 오셨다면 자기 서버에서 \"?문의 테스트 성공\"으로 문의를 주세요.`)
                });
              } catch(error){
                  interaction.reply(`오류:${error}`);
              };
    });
    } else{
      interaction.reply("뒤에 인수는 \"리스트\" \"소유자\"")
    }
  }
}