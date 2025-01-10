const { EmbedBuilder } = require('discord.js'); // Importar EmbedBuilder
const fs = require('fs');
const { prefix } = require('../config.json');
module.exports = {
  name: 'help',
  description: 'Muestra una lista de comandos disponibles.',
  category: 'Utilidad',
  execute(message, args) {
    // Leer todos los comandos desde la carpeta ./comandos
    const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
    const commands = commandFiles.map(file => require(`./${file}`));
    const { client } = message;
    // Categorizar los comandos
    const categorizedCommands = {};
    const uncategorizedCommands = [];

    commands.forEach(command => {
      const { category, name, description } = command;
      const formattedCommand = `\`${name}\`: ${description}`;
      if (!category) {
        uncategorizedCommands.push(formattedCommand);
      } else {
        const categoryKey = category.toLowerCase();
        if (!categorizedCommands[categoryKey]) {
          categorizedCommands[categoryKey] = [];
        }
        categorizedCommands[categoryKey].push(formattedCommand);
      }
    });

    // Si no se especifica una categoría, mostrar las categorías disponibles
    if (args.length === 0) {
      const categoryList = Object.keys(categorizedCommands)
        .map(category => `• **${category.charAt(0).toUpperCase() + category.slice(1)}**`) // Formatear categorías
        .join('\n');

      // Crear un embed para mostrar las categorías
      const embed = new EmbedBuilder()
        .setTitle(`Lista de comandos de Chocotorta 🍫`)
        .setDescription(
          `### Si quieres ver el listado de comandos de una categoría:\n` +
          `\`${prefix}help [categoría]\`\n\n` +
          `### 🔍 Categorías disponibles\n\n${categoryList}`
        )
        .setColor(`#F0E2B6`)
        .setFooter({ text: 'Chocotorta v1.0.0', iconURL: client.user.displayAvatarURL() });

      message.channel.send({ embeds: [embed] });
    } else {
      // Si se especifica una categoría, mostrar los comandos de esa categoría
      const requestedCategory = args.join(' ').toLowerCase();
      const categoryCommands = categorizedCommands[requestedCategory];

      if (!categoryCommands) {
        // Si no se encuentra la categoría, enviar un mensaje de error
        const embed = new EmbedBuilder()
          .setDescription(`❌ No se encontraron comandos en la categoría **${requestedCategory}**.`)
          .setColor(`#F0E2B6`);

        message.channel.send({ embeds: [embed] });
      } else {
        // Mostrar los comandos de la categoría
        const categoryMessage = categoryCommands.join('\n');

        const embed = new EmbedBuilder()
          .setTitle(`Comandos en la categoría: ${requestedCategory.charAt(0).toUpperCase() + requestedCategory.slice(1)}`)
          .setDescription(categoryMessage)
          .setColor(`#F0E2B6`);

        message.channel.send({ embeds: [embed] });
      }
    }
  },
};
