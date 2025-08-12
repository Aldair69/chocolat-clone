const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'avatar',
  description: 'Muestra el avatar del usuario o el mencionado.',
  async execute(message, args) {
  var member = message.author
  // Si args[0] es mencion o id
  if(args[0]) member = message.mentions.members.first() || message.guild.members.resolve(args[0])
  const user = await message.client.users.fetch(member.id).catch(() => null);
  if (!user) return message.reply('No encontré a ese usuario.');
  const embed = new EmbedBuilder()
    .setTitle(`${user.username}#${user.discriminator}`)
    .setDescription(`[AvatarURL](${user.displayAvatarURL({ size: 1024 })})`)
    .setImage(user.displayAvatarURL({ size: 1024 }))
    .setFooter({ text: `ID: ${member.id}` }) // ID como footer
    .setColor('#FF0000') // Rojo
  await message.channel.send({ embeds: [embed] });
 }, // Fin
};
