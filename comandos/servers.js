const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'servers',
  description: 'Muestra una lista de los servidores donde está el bot.',
  category: 'Utilidad',
  async execute(message) {
    const { client } = message; // Cliente del bot

    // Obtener la lista de servidores donde está el bot
    const guilds = client.guilds.cache.map(guild => guild.name);

    // Crear un embed para mostrar los servidores
    const embed = new EmbedBuilder()
      .setTitle('💬 Servidores donde estoy:')
      .setDescription(guilds.join('\n')) // Mostrar los nombres de los servidores como una lista
      .setColor('#FF0000') // Rojo puro

    // Enviar el embed
    await message.channel.send({ embeds: [embed] });
  },
};
