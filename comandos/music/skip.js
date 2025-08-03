const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'skip',
  description: 'Salta la canción actual y reproduce la siguiente',

  async execute(message) {
    //Algunos de estos deben ser cambiados a embed con hex gris
    const guildId = message.guild.id;
    const queueMap = global.queueMap;

    if (!queueMap || !queueMap.has(guildId)) {
      return message.reply('📭 No hay canciones en la cola.');
    }

    const serverQueue = queueMap.get(guildId);

    if (!serverQueue.currentSong) {
      return message.reply('❌ No hay canción reproduciéndose ahora.');
    }

    // Detener el audio actual, esto activa a AudioPlayerStatus.Idle
    serverQueue.player.stop();

    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setDescription('⏭️ Canción saltada.');

    await message.channel.send({ embeds: [embed] });
  }
};
