const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'cry',
  description: 'Muestra una imagen de un personaje llorando.',
  async execute(message) {
    const cryFolder = path.join(__dirname, '..', '..', 'media', 'react', 'cry');
    const folders = fs.readdirSync(cryFolder).filter(file => fs.statSync(path.join(cryFolder, file)).isDirectory());

    const randomFolder = folders[Math.floor(Math.random() * folders.length)];

    const files = fs.readdirSync(path.join(cryFolder, randomFolder)).filter(file => file.endsWith('.gif') || file.endsWith('.png') || file.endsWith('.jpg'));

    const randomFile = files[Math.floor(Math.random() * files.length)];

    const embed = new EmbedBuilder()
      .setColor('#33a9db')
      .setDescription(`Las lágrimas caen de los ojos de **${message.author.username}**`)
      .setImage(`attachment://${randomFile}`)
      .setFooter({ text: `Anime: ${randomFolder.replace('cry', '').replace('-', ' ')}` });

    await message.channel.send({ embeds: [embed], files: [path.join(cryFolder, randomFolder, randomFile)] });
  },
};
