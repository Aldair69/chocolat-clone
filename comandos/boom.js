const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'boom',
  description: 'Muestra una imagen de una explosión.',
  category: 'Interacciones',
  async execute(message) {
    // Obtener la lista de carpetas dentro de la carpeta boom/
    const boomFolder = path.join(__dirname, '..', 'interacciones', 'boom');
    const folders = fs.readdirSync(boomFolder).filter(file => fs.statSync(path.join(boomFolder, file)).isDirectory());

    // Seleccionar aleatoriamente una carpeta
    const randomFolder = folders[Math.floor(Math.random() * folders.length)];

    // Obtener la lista de archivos dentro de la carpeta seleccionada
    const files = fs.readdirSync(path.join(boomFolder, randomFolder)).filter(file => file.endsWith('.gif') || file.endsWith('.png') || file.endsWith('.jpg'));

    // Seleccionar aleatoriamente un archivo
    const randomFile = files[Math.floor(Math.random() * files.length)];

    // Crear un embed con la imagen
    const embed = new EmbedBuilder()
      .setDescription(`**¡¡BOOOOOOOOOOMM!!! 💣**`)
      .setImage(`attachment://${randomFile}`)
      .setFooter({ text: `Anime: ${randomFolder.replace('boom', '').replace('-', ' ')}` });

    // Enviar el embed con la imagen adjunta
    await message.channel.send({ embeds: [embed], files: [path.join(boomFolder, randomFolder, randomFile)] });
  },
};
