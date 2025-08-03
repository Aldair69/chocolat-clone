const { EmbedBuilder } = require('discord.js');
const os = require('os');
module.exports = {
  name: 'botstats',
  description: 'Muestra información sobre el bot.',
  async execute(message) {
    // Obtener datos del bot
    const { client } = message; // El cliente de Discord
    const developer = 'aldairsoraki';
    const version = 'BETA 1.0.0';
    const library = 'Discord.js ^14.21.0';
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Memoria en MB
    const uptime = client.uptime; // Uptime en milisegundos
    const totalSeconds = Math.floor(uptime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60; //Podria comprimirlo pero asi se entiende mas
    const formattedUptime = `${hours} hrs, ${minutes} mins, ${seconds} secs`;

    // Obtener datos de los servidores
    const serverCount = client.guilds.cache.size;
    const userCount = client.users.cache.size;
    const channelCount = client.channels.cache.size;
    const voiceConnections = client.voice.adapters.size;

    // Crear el embed
    const embed = new EmbedBuilder()
      .setAuthor({
        name: "Información de la bot",
        iconURL: client.user.displayAvatarURL(),
      })
      .setColor('#FF0000') // Rojo puro
      .addFields(
        { name: 'Desarrolladora', value: developer, inline: true },
        { name: 'Versión', value: version, inline: true },
        { name: 'Librería', value: library, inline: true },
        { name: 'Memoria', value: `${memoryUsage} MB`, inline: true },
        { name: 'Uptime', value: formattedUptime, inline: true },
        { name: 'Servidores', value: `${serverCount}`, inline: true },
        { name: 'Usuarios', value: `${userCount}`, inline: true },
        { name: 'Canales', value: `${channelCount}`, inline: true },
        { name: 'Conexiones a voz', value: `${voiceConnections}`, inline: true }
      )

    await message.channel.send({ embeds: [embed] });
  },
};
