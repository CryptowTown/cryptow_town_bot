const { getAllMembers, getAllRoles } = require("../helpers/utils");
const { MessageEmbed } = require("discord.js");
const { SERVER, ROLES } = require("../config");

module.exports = {
  name: "info",
  alias: ["info"],
  async execute(message, client, args) {
    const members = await getAllMembers();
    const bots = members.filter((member) => member.user.bot);
    const founders = members.filter((member) =>
      member.roles.cache.get("941104117978370070")
    );
    const verifieds = members.filter((member) =>
      member.roles.cache.get("946843806102356080")
    );
    const unverifieds = members.filter((member) =>
      member.roles.cache.get("946843874503032912")
    );
    const townLoyals = members.filter((member) =>
      member.roles.cache.get(ROLES.TOW_LOYAL_ROLE_ID)
    );
    let onlineMembers = members.filter((member) => {
      const status = member?.presence?.status;
      return !member.user.bot && status === "online";
    });
    const rolesCount = await getAllRoles();

    const tpl = `
    👤 Miembros totales: ${members.size}
    👑 Fundadores: ${founders.size}
    ✅ Miembros verificados: ${verifieds.size}
    ❓ Miembros no verificados: ${unverifieds.size}
    🧍 Miembros town loyals: ${townLoyals.size}
    🟢 Miembros en linea: ${onlineMembers.size}
    📜 Cantidad de roles: ${rolesCount.size}
    🤖 Bots totales: ${bots.size}
  `;
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Información básica del servidor")
      .setDescription(tpl)
      .setThumbnail("https://i.imgur.com/sWcAXL6.jpg")
      .setTimestamp();

    message.reply({ embeds: [embed] });
    message.react("✅");
  },
};
