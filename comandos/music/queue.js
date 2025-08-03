const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'queue',
  description: 'Muestra la lista de canciones en la cola',

  async execute(message) {
    const guildId = message.guild.id;
    const queueMap = global.queueMap;

    if (!queueMap || !queueMap.has(guildId)) {
      return message.reply('📭 No hay canciones en la cola.');
    }

    const serverQueue = queueMap.get(guildId);
    const currentSong = serverQueue.currentSong;

    const embedQueue = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(':page_with_curl: Lista de Canciones');

    if (!currentSong && serverQueue.songs.length === 0) {
      embedQueue.setDescription('📭 No hay canciones en la cola.');
    } else {
      embedQueue.setDescription(
        `**Estado**\nReproduciendo: ${currentSong ? currentSong.title : 'una canción desconocida'}\n\n` +
        (serverQueue.songs.length > 0
          ? `**Próximas canciones:**\n` +
            serverQueue.songs.map((s, i) => `${i + 1}.- ${s.title} Pedido por ${s.requestedBy}`).join('\n')
          : 'No hay próximas canciones.')
      );
    }

    await message.channel.send({ embeds: [embedQueue] });
  }
};
