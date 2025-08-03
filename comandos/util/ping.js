const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Muestra la latencia del bot y la API de Discord.',
  async execute(message) {
    // Calcular la latencia del bot
    const sentMessage = await message.reply('Calculando latencia...'); // Mensaje temporal
    const botLatency = sentMessage.createdTimestamp - message.createdTimestamp;

    // Obtener la latencia de la API de Discord redondeada
    const apiLatency = Math.round(message.client.ws.ping);
    const embed = new EmbedBuilder()
      .setTitle('🏓 ¡Pong!')
      .setDescription(
        `:incoming_envelope: **Envío de mensajes**: \`${botLatency} ms\`\n` +
        `:satellite: **Discord**: \`${apiLatency} ms\``
      )
      .setColor('#FF0000')

    // Editar el mensaje original con el embed
    await sentMessage.edit({ content: null, embeds: [embed] });
  },
};
