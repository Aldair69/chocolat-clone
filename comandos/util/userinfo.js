const { EmbedBuilder } = require('discord.js');
const moment = require('moment');
moment.locale('es'); //Podriamos usar la syntaxis de discord para esto pero asi era antes

module.exports = {
  name: 'userinfo',
  description: 'Muestra información completa de un usuario o el mencionado.',
  async execute(message, args) {
    var member = message.member;

    // Si args[0] es mencion o ID
    if (args[0]) {
      member = message.mentions.members.first() || message.guild.members.resolve(args[0]);
    }

    if (!member) return message.reply('No encontré a ese usuario en este servidor.');
    const user = await message.client.users.fetch(member.id).catch(() => null);
    if (!user) return message.reply('No encontré a ese usuario.');

    // Apodo
    const nickname = member.nickname || 'Sin apodo.';

    // Booster
    const booster = member.premiumSince
      ? `Desde ${moment(member.premiumSince).format('D [de] MMMM [de] YYYY, HH:mm')} (hace ${moment(member.premiumSince).fromNow(true)})`
      : 'No es suscriptor.';

    // Roles (incluye @everyone pq asi lo hace yuki)
    let roles = member.roles.cache.map(r => `<@&${r.id}>`);
    if (roles.length < 1) roles = ['Ninguno'];

    const embed = new EmbedBuilder()
      .setColor('#FF0000') // rojo
      .setAuthor({ name: `${user.username} (${user.tag})`, iconURL: user.displayAvatarURL({ size: 1024 }) })
      .setThumbnail(user.displayAvatarURL({ size: 1024 }))
      .addFields(
        { name: 'ID', value: member.id, inline: true },
        { name: 'Apodo', value: nickname, inline: true },
        { name: 'Creación de cuenta', value: `${moment(user.createdAt).format('D [de] MMMM [de] YYYY, HH:mm')} (hace ${moment(user.createdAt).fromNow(true)})`, inline: false },
        { name: 'Ingreso al servidor', value: `${moment(member.joinedAt).format('D [de] MMMM [de] YYYY, HH:mm')} (hace ${moment(member.joinedAt).fromNow(true)})`, inline: false },
        { name: 'Mejora en el servidor', value: member.premiumSince ? `${moment(member.premiumSince).format('D [de] MMMM [de] YYYY, HH:mm')} (hace ${moment(member.premiumSince).fromNow(true)})` : 'Nunca', inline: false },
        { name: 'Booster', value: booster, inline: false },
        { name: `Roles [${roles.length}]`, value: roles.join(', '), inline: false }
      )

    await message.channel.send({ embeds: [embed] });
  },
};
