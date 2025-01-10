const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'claps',
  description: 'Muestra una imagen de alguien aplaudiendo.',
  category: 'Interacciones',
  async execute(message) {
    // Obtener la lista de carpetas dentro de la carpeta claps/
    const clapsFolder = path.join(__dirname, '..', 'interacciones', 'claps');
    const folders = fs.readdirSync(clapsFolder).filter(file => fs.statSync(path.join(clapsFolder, file)).isDirectory());

    // Seleccionar aleatoriamente una carpeta
    const randomFolder = folders[Math.floor(Math.random() * folders.length)];

    // Obtener la lista de archivos dentro de la carpeta seleccionada
    const files = fs.readdirSync(path.join(clapsFolder, randomFolder)).filter(file => file.endsWith('.gif') || file.endsWith('.png') || file.endsWith('.jpg'));

    // Seleccionar aleatoriamente un archivo
    const randomFile = files[Math.floor(Math.random() * files.length)];

    // Crear un embed con la imagen
    const embed = new EmbedBuilder()
      .setDescription(`¡**${message.author.username}** aplaude, aplaude!`)
      .setImage(`attachment://${randomFile}`)
      .setFooter({ text: `Anime: ${randomFolder.replace('claps', '').replace('-', ' ')}` });

    // Enviar el embed con la imagen adjunta
    await message.channel.send({ embeds: [embed], files: [path.join(clapsFolder, randomFolder, randomFile)] });
  },
};
