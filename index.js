const { Client , Intents , Collection, Interaction , ThreadManager , MessageEmbed , Permissions } = require('discord.js');
const client = new Client({intents:32767});
module.exports = client;
const { prefix , token } = require('./config.json');
const fs = require('fs');
const { DiscordTogether } = require('discord-together');
const { error } = require('console');
client.discordTogether = new DiscordTogether(client);
const Dokdo = require('dokdo');
const { ClientRequest } = require('http');
const DokdoHandler = new Dokdo(client, { aliases: ['d'], prefix: `${prefix}` , owners: ['507116488998518784','748053165886275604','845307537593991218'], shell: process.env.SHELL}) //대지 , 피치애로우 , 룰루90
//const { REST } = require('@discord/rest')
//const { Routes } = require('discord-api-types')
//const commands = []


//슬래쉬 커맨드 핸들
/*
fs.readdirSync("./slashcommands").forEach(dirs => {
  const commandfolder = fs.readdirSync(`./slashcommands/${dirs}/`).filter(file => file.endsWith(".js"))
  for (const file of commandfolder){
    const command = require(`./slashcommands/${dirs}/${file}`)
    commands.push(command.data.toJSON())
    client.slashcommands.set(command.data.name, command)
    delete require.cache[require.resolve(`./slashcommands/${dirs}/${file}`)]
})

const rest = new REST({version;'9'}).setToken(process.env.TOKEN)
*/

client.slashcommands = new Collection();
var data = [];
const commandsFile1 = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));
for(const file of commandsFile1){
	const command = require(`./slashcommands/${file}`);
	client.slashcommands.set(command.name , command);
	data.push({name: command.name , description: command.description , options: command.options});
}

client.on("interactionCreate", async interaction => {
	if(!interaction.isCommand()) return;
	if(!client.slashcommands.has(interaction.commandName)) return
	const command = client.slashcommands.get(interaction.commandName);
	if(!command) return;
	try{
		await command.execute(interaction)
  } catch(err){
    console.log(err);
		await interaction.reply({ content : `오류가 발생했습니다. \n 오류내용 : ${err}`, ephemeral: true });
	}
})

//서버 추가되면 슬커 자동 등록

client.on('guildCreate', async guild => {
    await client.guilds.cache.get(guild.id)?.commands.set(data);
});


//레디

client.once('ready',  async ()=>{
	client.guilds.cache.forEach(gd=>{
		gd.commands.set(data);
	})
	console.log(`Logged In As ${client.user.tag}(${client.user.id})`);
	const date = new Date();
	const time = Math.round(date / 1000);
	const sembed = new MessageEmbed()
		.setTitle("봇 실행로그")
		.setDescription(`실행시간 : <t:${time}>`)
		.setTimestamp(new Date())
		.setColor("GREEN")
	client.channels.cache.get('880457103335108659').send({embeds:[sembed]})
	//let number = 0;
	//setInterval(() => {
		///*
	//	const listurl = ["https://twitch.tv/b_nodadge", "https://www.twitch.tv/alpha_beta_gamm_a"];
	//	const listtype = ["대지 트위치", "감마 트위치","호스팅은 헤로쿠"];
   // const actype = ["STREAMING","STREAMING","PLAYING"]
	//	client.user.setActivity(listtype[number],{ type: actype[number] , url:listurl[number]})
		client.user.setActivity("?명령어",{type: "PLAYING"})
	//	number++
		//if(number > 2) number = 0;
		//*/
		//client.user.setActivity("점검중...", { type: "PLAYING"}) //테스트 할 때(테스트 할때)
	//},4000)
})


//질문방 스레드

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if(message.channel.id !== '957504157898637322'&& message.channel.id !== '959788637422247997' && message.channel.id !== '959788637422248005') return; //여러개의 채널을 할땐 || 말고 &&으로 이어서 하기
    if (message.content.includes("")) {
        if (message.content.length > 100) {
            return message.reply("100자 이내로 질문해주세요!\n간단한 내용을 입력 후 스레드가 생성되면 자세한 내용을 설명해주세요!").then((x) => {
                message.delete()
                setTimeout(() => x.delete(), 4000)
            })
        }
        const thread = await message.startThread({
            name: message.content,
            autoArchiveDuration: 1440,
            type: 'GUILD_PRIVATE_THREAD',
        });
        const threadembed = new MessageEmbed()
            .setTitle("질문 스레드가 생성되었어요!")
            .setDescription(`질문내용 : ${message.content}`)
            .addField("질문자", `<@${message.author.id}>`, true)
            .setColor("#a1f1f1");
        thread.send({ embeds: [threadembed] })
    }
})



//오류 무시
process.on("unhandledRejection", err=>{
	if(err == "DiscordAPIError: Missing Access") return console.log("봇에게 슬래쉬 커맨드 푸쉬 권한이 없습니다.");
	console.log(err);
})


//메세지 커맨드 핸들

client.commands = new Collection();

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandsFile){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name , command);
}

client.on('messageCreate' , async(message)=>{
  DokdoHandler.run(message)
  if(!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift();
	const command = client.commands.get(commandName);
  if(!command) return
	try{
		command.execute( message, args );
	} catch(error){
		console.log(error);
	}
})


client.on('messageCreate', async(message)=>{
    if(message.content == `${prefix}유튜브`){
        const channel = message.member.voice.channel;
        if(!channel) return message.reply("음성채널에 접속해주세요!");
        client.discordTogether.createTogetherCode(channel.id, 'youtube').then(invite =>{
            return message.reply(invite.code);
        })
    }
})


//자유음성채널 설정


client.on('voiceStateUpdate', async (newState, oldState) => {
	const channel = newState.guild.channels.cache.find(c => c.name === "자유음성채널생성");
	if(newState.member.voice.channel){
		if(!channel) return;
		if(newState.member.voice.channel.id !== channel.id) return;
		newState.guild.channels.create(`${newState.member.user.username}의 음성방`, {
			type: "GUILD_VOICE",
			parent: oldState.channel.parent
		}).then(ch => {
			if(!ch) return;
			newState.member.voice.setChannel(ch);
			const interval = setInterval(() => {
				if(ch.deleted == true){
					clearInterval(interval);
					return;
				}
				if(ch.members.size == 0){
					ch.delete();
					console.log("채널 삭제됨");
					return;
				}
			}, 5000);
		})
	}
})
client.on('messageCreate', async (message)=>{
	if(message.content == "핑"){
		message.reply(`퐁`);
	}
});

client.login(token);