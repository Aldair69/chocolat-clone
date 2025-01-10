const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Muestra la latencia del bot y la API de Discord.',
  category: 'Utilidad',
  async execute(message) {
    // Calcular la latencia del bot (tiempo de envío de mensajes)
    const sentMessage = await message.reply('Calculando latencia...'); // Mensaje temporal
    const botLatency = sentMessage.createdTimestamp - message.createdTimestamp;

    // Obtener la latencia de la API de Discord
    const apiLatency = Math.round(message.client.ws.ping);

    // Crear un embed con los resultados
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
