const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'cry',
  description: 'Muestra una imagen de un personaje llorando.',
  category: 'Interacciones',
  async execute(message) {
    // Obtener la lista de carpetas dentro de la carpeta cry/
    const cryFolder = path.join(__dirname, '..', 'interacciones', 'cry');
    const folders = fs.readdirSync(cryFolder).filter(file => fs.statSync(path.join(cryFolder, file)).isDirectory());

    // Seleccionar aleatoriamente una carpeta
    const randomFolder = folders[Math.floor(Math.random() * folders.length)];

    // Obtener la lista de archivos dentro de la carpeta seleccionada
    const files = fs.readdirSync(path.join(cryFolder, randomFolder)).filter(file => file.endsWith('.gif') || file.endsWith('.png') || file.endsWith('.jpg'));

    // Seleccionar aleatoriamente un archivo
    const randomFile = files[Math.floor(Math.random() * files.length)];

    // Crear un embed con la imagen
    const embed = new EmbedBuilder()
      .setDescription(`Las lágrimas caen de los ojos de **${message.author.username}**`)
      .setImage(`attachment://${randomFile}`)
      .setFooter({ text: `Anime: ${randomFolder.replace('cry', '').replace('-', ' ')}` });

    // Enviar el embed con la imagen adjunta
    await message.channel.send({ embeds: [embed], files: [path.join(cryFolder, randomFolder, randomFile)] });
  },
};
