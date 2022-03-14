module.exports = {
  name: "test",
  alias: ["test"],
  execute(message, client, args) {
    message.reply(`Test command with: ${obj.args.join(", ")} arguments`);
    message.react("🤔");
  },
};
