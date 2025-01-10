const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'banghead',
  description: 'Muestra una imagen de un personaje golpeando su cabeza.',
  category: 'Interacciones',
  async execute(message) {
    // Obtener la lista de carpetas dentro de la carpeta banghead/
    const bangheadFolder = path.join(__dirname, '..', 'interacciones', 'banghead');
    const folders = fs.readdirSync(bangheadFolder).filter(file => fs.statSync(path.join(bangheadFolder, file)).isDirectory());

    // Seleccionar aleatoriamente una carpeta
    const randomFolder = folders[Math.floor(Math.random() * folders.length)];

    // Obtener la lista de archivos dentro de la carpeta seleccionada
    const files = fs.readdirSync(path.join(bangheadFolder, randomFolder)).filter(file => file.endsWith('.gif') || file.endsWith('.png') || file.endsWith('.jpg'));

    // Seleccionar aleatoriamente un archivo
    const randomFile = files[Math.floor(Math.random() * files.length)];

    // Crear un embed con la imagen
    const embed = new EmbedBuilder()
      .setDescription(`¡**${message.author.username}** está golpeando su cabeza contra lo que sea!`)
      .setImage(`attachment://${randomFile}`)
      .setFooter({ text: `Anime: ${randomFolder.replace('banghead', '').replace('-', ' ')}` });

    // Enviar el embed con la imagen adjunta
    await message.channel.send({ embeds: [embed], files: [path.join(bangheadFolder, randomFolder, randomFile)] });
  },
};
