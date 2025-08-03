const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'boom',
  description: 'Muestra una imagen de una explosión.',
  async execute(message) {
    // Seleccionar anime y gif
    const boomFolder = path.join(__dirname, '..', '..', 'media', 'react', 'boom');
    const folders = fs.readdirSync(boomFolder).filter(file => fs.statSync(path.join(boomFolder, file)).isDirectory());
    const randomFolder = folders[Math.floor(Math.random() * folders.length)];

    const files = fs.readdirSync(path.join(boomFolder, randomFolder)).filter(file => file.endsWith('.gif') || file.endsWith('.png') || file.endsWith('.jpg'));

    const randomFile = files[Math.floor(Math.random() * files.length)];

    // Crear un embed con la imagen
    const embed = new EmbedBuilder()
      .setColor("#c972ef")
      .setDescription(`**¡¡BOOOOOOOOOOMM!!! 💣**`)
      .setImage(`attachment://${randomFile}`)
      .setFooter({ text: `Anime: ${randomFolder.replace('boom', '').replace('-', ' ')}` });

    await message.channel.send({ embeds: [embed], files: [path.join(boomFolder, randomFolder, randomFile)] });
  },
};
