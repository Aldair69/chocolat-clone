const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'cook',
  description: 'Muestra una imagen de alguien cocinando.',
  async execute(message) {
    const cookFolder = path.join(__dirname, '..', '..', 'media', 'interact', 'cook');
    const folders = fs.readdirSync(cookFolder).filter(file => fs.statSync(path.join(cookFolder, file)).isDirectory());

    // Seleccionar gif del anime
    const randomFolder = folders[Math.floor(Math.random() * folders.length)];

    const files = fs.readdirSync(path.join(cookFolder, randomFolder)).filter(file => file.endsWith('.gif') || file.endsWith('.png') || file.endsWith('.jpg'));

    const randomFile = files[Math.floor(Math.random() * files.length)];

    const embed = new EmbedBuilder()
      .setColor("#10b742")
      .setDescription(`Dejen a **${message.author.username}** cocinar...`)
      .setImage(`attachment://${randomFile}`)
      .setFooter({ text: `Anime: ${randomFolder.replace('cook', '').replace('-', ' ')}` });

    await message.channel.send({ embeds: [embed], files: [path.join(cookFolder, randomFolder, randomFile)] });
  },
};
