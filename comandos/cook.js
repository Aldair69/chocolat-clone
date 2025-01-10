const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'cook',
  description: 'Muestra una imagen de alguien cocinando.',
  category: 'Interacciones',
  async execute(message) {
    // Obtener la lista de carpetas dentro de la carpeta cook/
    const cookFolder = path.join(__dirname, '..', 'interacciones', 'cook');
    const folders = fs.readdirSync(cookFolder).filter(file => fs.statSync(path.join(cookFolder, file)).isDirectory());

    // Seleccionar aleatoriamente una carpeta
    const randomFolder = folders[Math.floor(Math.random() * folders.length)];

    // Obtener la lista de archivos dentro de la carpeta seleccionada
    const files = fs.readdirSync(path.join(cookFolder, randomFolder)).filter(file => file.endsWith('.gif') || file.endsWith('.png') || file.endsWith('.jpg'));

    // Seleccionar aleatoriamente un archivo
    const randomFile = files[Math.floor(Math.random() * files.length)];

    // Crear un embed con la imagen
    const embed = new EmbedBuilder()
      .setDescription(`Dejen a **${message.author.username}** cocinar...`)
      .setImage(`attachment://${randomFile}`)
      .setFooter({ text: `Anime: ${randomFolder.replace('cook', '').replace('-', ' ')}` });

    // Enviar el embed con la imagen adjunta
    await message.channel.send({ embeds: [embed], files: [path.join(cookFolder, randomFolder, randomFile)] });
  },
};
