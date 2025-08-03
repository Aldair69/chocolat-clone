const { EmbedBuilder } = require('discord.js');
const { prefix } = require('../../config.json');

// Funcion para normalizar
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '') 
    .toLowerCase()
    .trim();
}

function encontrarCategoriaParecida(entrada, categorias) {
  const entradaNormalizada = normalizar(entrada);
  let mejorCoincidencia = null;
  let puntajeMaximo = 0;

  for (const cat of categorias) {
    const normal = normalizar(cat);

    // Puntaje por coincidencia de palabras clave
    let puntaje = 0;
    if (normal.includes(entradaNormalizada)) puntaje += 2;
    if (entradaNormalizada.includes(normal)) puntaje += 2;
    if (entradaNormalizada === normal) puntaje += 5;

    // Coincidencia parcial palabra por palabra
    const palabrasEntrada = entradaNormalizada.split(' ');
    const palabrasCat = normal.split(' ');

    palabrasEntrada.forEach(palabra => {
      if (palabrasCat.includes(palabra)) puntaje += 1;
    });

    if (puntaje > puntajeMaximo) {
      puntajeMaximo = puntaje;
      mejorCoincidencia = cat;
    }
  }

  return puntajeMaximo >= 2 ? mejorCoincidencia : null; // solo si tiene buen puntaje
}

module.exports = {
  name: 'help',
  description: 'Muestra una lista de comandos disponibles.',

  execute(message, args) {
    const { client } = message;

    // Por categoria
    const categorizedCommands = {};

    for (const command of client.commands.values()) {
      const categoria = command.categoria || 'Sin categoría';
      if (!categorizedCommands[categoria]) {
        categorizedCommands[categoria] = [];
      }
      categorizedCommands[categoria].push(`\`${command.name}\`: ${command.description || 'Sin descripción'}`);
    }

    const categoriasDisponibles = Object.keys(categorizedCommands);

    // Si no hay argumentos, mostrar categorias
    if (args.length === 0) {
      const categoryList = categoriasDisponibles
        .map(cat => `• **${cat}**`)
        .join('\n');

      const embed = new EmbedBuilder()
        .setTitle(`Lista de comandos de Chocotorta 🍫`)
        .setDescription(
          `### Si quieres ver los comandos de una categoría:\n` +
          `\`${prefix}help [categoría]\`\n\n` +
          `### 🔍 Categorías disponibles:\n${categoryList}`
        )
        .setColor('#F0E2B6')
        .setFooter({ text: 'Chocotorta v1.0.0', iconURL: client.user.displayAvatarURL() });

      return message.channel.send({ embeds: [embed] });
    }

    // Si hay argumento, intentar encontrar la categoria
    const entradaUsuario = args.join(' ');
    const categoriaCoincidente = encontrarCategoriaParecida(entradaUsuario, categoriasDisponibles);

    if (!categoriaCoincidente) {
      const embed = new EmbedBuilder()
        .setDescription(`❌ No se encontraron comandos en una categoría parecida a **${entradaUsuario}**.`)
        .setColor('#F0E2B6');

      return message.channel.send({ embeds: [embed] });
    }

    // Mostrar comandos de categoria
    const comandos = categorizedCommands[categoriaCoincidente].join('\n');

    const embed = new EmbedBuilder()
      .setTitle(`Comandos en la categoría: ${categoriaCoincidente}`)
      .setDescription(comandos)
      .setColor('#F0E2B6');

    return message.channel.send({ embeds: [embed] });
  },
};
