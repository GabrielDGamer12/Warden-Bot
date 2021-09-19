const fs = require('fs');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
console.log(`Hello from Node.js ${process.version}!`);
const Discord = require("discord.js");
const config = require("./config.json");
const { prefix } = require("./config.json");
const client = new Discord.Client();

// BOT-STATUS //

client.on("ready", () => {
  let activities = [
      //`Utilize ${config.prefix}ajuda para obter Ajuda`,
      //`${client.users.cache.size} membros!`,
      //`GabrielDGamer`,
      //`Codigo Aberto: +codigo`
      `Bot em Desenvolvimento`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        name: 'GabrielDGamer',
        type: "WATCHING"
      }), 1000 * 60); 
  client.user
      .setStatus("online")
      .catch(console.error);
console.log("Estou Online!")
});

// BOT-STATUS //



// WELCOME //

client.on("guildMemberAdd", async (member) => {

  let guild = await client.guilds.cache.get("885478208558993499");
  let channel = await client.channels.cache.get("889062649516654622");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
    var mention = `${member.user}`;
    let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`Bem-vindo`)
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**!**`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("")
      .setTimestamp();

    channel.send(mention, embed);
});

/*client.on('guildMemberAdd', member => {
var role = member.guild.roles.cache.find(role => role.name == "▬▬▬ MEMBRO ▬▬▬")
member.roles.add(role);
});*/

client.on('guildMemberAdd', member => {
var role = member.guild.roles.cache.find(role => role.name == "『💎』MEMBROS")
member.roles.add(role);
});

//  WELCOME



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
client.prefix = config.prefix;

["commands", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
  });

  client.on('guildMemberAdd', async member => {
    require("./events/guild/memberAdd")(member)
  })
//  HANDLER //




client.login(process.env.TOKEN);