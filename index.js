const { Client, Intents } = require("discord.js");
const TOW_LORAL_ROLE_ID = "946849633655750727";
const SERVER_ID = "941104117978370069";

const client = new Client({
  intents: [
    "GUILD_MEMBERS",
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
});
const config = require("./config.json");
const { isCommand, getCommand } = require("./utils");

client.on("ready", async () => {
  console.log(`${client.user.username} esta preparado!`);
  client.user.setActivity("con mis amigos 😎.");

  const server = client.guilds.cache.get(SERVER_ID);
  await server.members.fetch();
  const roles = server.roles.cache.get(TOW_LORAL_ROLE_ID).members;
  const allRoles = await server.roles.fetch();
  const allRolesName = allRoles.map((role) => ({
    name: role.name,
    members: role.members,
  }));
  console.log(allRolesName);
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  if (isCommand(message.content)) {
    const command = getCommand(message.content);
    console.log(command);
    switch (command) {
      case "test":
        message.reply("testing");
        //message.react("🤔");
        break;
    }
  }
});

client.on("message", (message) => {
  if (message.channel.id === "946809488164413511") {
    if (message.author.bot) return;

    if (message.content === "Acepto") {
      message.member.roles.put(TOW_LORAL_ROLE_ID);
      message.author.send(
        "Gracias por verificarte demos un tour por las reglas, las preguntas comunes y los canales de comunicacion recuerda que debes comunicarte en el lenguaje debido en cada canal, en los canales generales se usa ingles."
      );
      message.delete();
    } else {
      message.author.send(
        "Tienes problemas para verificarte? solo escribe las palabras tal cual se te pide."
      );
      message.delete();
    }
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.emoji.name === "✅") {
    const member = await reaction.message.guild.members.fetch(user.id);

    member.roles.add(TOW_LORAL_ROLE_ID);
  }
});

client.login(config.token);
