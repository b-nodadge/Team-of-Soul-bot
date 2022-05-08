const { CommandInteraction , MessageEmbed } = require('discord.js')
module.exports = {
    name: "따라해",
    description: "님이 하는 말을 따라합니다.",
    options : [
        {
            name: "말",
            description: "이 말을 따라합니다.",
            type: "STRING",
            required: "true"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction){
        var follow = interaction.options.getString("말")
        const followembed = new MessageEmbed()
        .setTitle("따라해")
        .setDescription("말을 따라합니다.")
        .addFields(
            {name: `${interaction.user.tag}님이 한 말` , value: `\`\`\`${follow}\`\`\``}
        )
        .setColor("RANDOM")
        .setTimestamp(new Date())
        .setFooter({ text: `${interaction.user.tag} ⬅ 이 사람의 말`, iconURL: interaction.user.displayAvatarURL()})
        .setThumbnail(interaction.user.displayAvatarURL())
        await interaction.reply({embeds : [followembed]})
    }
}