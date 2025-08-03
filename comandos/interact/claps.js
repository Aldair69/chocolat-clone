const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'claps',
  description: 'Muestra una imagen de alguien aplaudiendo.',
  async execute(message) {
    const clapsFolder = path.join(__dirname, '..', '..', 'media', 'interact', 'claps');
    const folders = fs.readdirSync(clapsFolder).filter(file => fs.statSync(path.join(clapsFolder, file)).isDirectory());

    const randomFolder = folders[Math.floor(Math.random() * folders.length)];

    const files = fs.readdirSync(path.join(clapsFolder, randomFolder)).filter(file => file.endsWith('.gif') || file.endsWith('.png') || file.endsWith('.jpg'));

    const randomFile = files[Math.floor(Math.random() * files.length)];

    const embed = new EmbedBuilder()
      .setColor("#e7145a")
      .setDescription(`¡**${message.author.username}** aplaude, aplaude!`)
      .setImage(`attachment://${randomFile}`)
      .setFooter({ text: `Anime: ${randomFolder.replace('claps', '').replace('-', ' ')}` });

    await message.channel.send({ embeds: [embed], files: [path.join(clapsFolder, randomFolder, randomFile)] });
  },
};
