const client = require("../index");
const style = "R";
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Discord,
} = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "status",
  async execute(message) {
    const starttime =
      `<t:${Math.floor(client.readyAt / 1000)}` +
      (style ? `:${style}` : "") +
      ">";
    const version = require("../package.json").version;
    const status = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("[✅] BOT-Status")
      .setThumbnail(
        client.user.displayAvatarURL()
      )
      .addFields(
        { name: "Ping", value: `${client.ws.ping} ms`, inline: true },
        {
          name: "Server Count",
          value: `${client.guilds.cache.size} Servers`,
          inline: true,
        },
        {
          name: "User Count",
          value: `${client.users.cache.size} Users`,
          inline: true,
        },
        {
          name: "Process Start",
          value: `${prettyMilliseconds(client.uptime)}`,
          inline: true,
        },
        { name: "Process Pid", value: `${process.pid}`, inline: true },
        {
          name: "Process Platform",
          value: `${process.platform}`,
          inline: true,
        },
        { name: "Discord.js", value: `v13.6.0`, inline: true },
        { name: "Node.js", value: `v16.14.2`, inline: true },
        { name: "TTS", value: `v${version}`, inline: true }
      )
      .setFooter({
        text: "BOT",
        iconURL:
          client.user.displayAvatarURL(),
      })
      .setTimestamp();

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("primary")
        .setLabel("Status")
        .setStyle("PRIMARY")
        .setDisabled(true)
    );

    message.reply({ embeds: [status], components: [button] });
  },
};