
module.exports = {
  name: 'invite',
  description: 'Manda la invitacion del bot.',
  execute(message) {
    message.reply("Te he enviado la invitación a tus mensajes privados.")
    message.author.send(`Aquí tienes mi link de invitación, ${message.author}\nhttps://discordapp.com/oauth2/authorize?client_id=1400346647434756096&permissions=8&scope=bot`);
  }
};
