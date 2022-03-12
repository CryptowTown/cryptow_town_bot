const { Client, Intents } = require("discord.js");

const BOT_SETTINGS = {
  prefix: "!",
  token: "OTUxMzI4NDU5MDMwOTI5NDM4.Yil3qw.M7ZapAyn0fbu3WyRnTSG2BspA1s",
  SERVER: {
    ID: "941104117978370069",
  },
  ROLES: {
    TOW_LOYAL_ROLE_ID: "946849633655750727",
    SPANISH_LANGUAGE_ROLE_ID: "944669253448114267",
    FRENCH_LANGUAGE_ROLE_ID: "944670801968377927",
    BRAZIL_LANGUAGE_ROLE_ID: "944672487231344731 ",
    VERIFIED_ROLE_ID: "946843806102356080",
  },
};

const client = new Client({
  intents: [
    "GUILD_MEMBERS",
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
});

module.exports = { ...BOT_SETTINGS, client };
