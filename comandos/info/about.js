const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'about',
  description: 'Muestra informacion sobre el bot.',
  async execute(message) {
    const { client } = message;

    const embed = new EmbedBuilder()
      .setTitle('Acerca de Chocotorta')
      .setDescription(
      'Chocotorta es una bot multiproposito inspirada en **Chocolat**, con un enfoque en la diversion y el entretenimiento del servidor.\n' +
      'Basada originalmente en la bot Chocolat (quien a su vez proviene del anime *Noucome*), Chocotorta busca ofrecer una experiencia familiar pero con su propia personalidad tierna y caotica.'
       )
      .addFields(
        { name: 'Creadora', value: 'aldairsoraki', inline: true },
        { name: 'Version', value: 'v1.0.0', inline: true },
        { name: 'Invitacion', value: '[Click aqui](https://discord.com/oauth2/authorize?client_id=1400346647434756096&scope=bot&permissions=8)', inline: true },
        { name: 'Info & codigo fuente', value: '[Click aqui](https://github.com/aldair69/chocolat-clone)', inline: true },
        { name: 'Ver inspiracion', value: '[Click aqui](https://web.archive.org/web/20210516184731/https://chocolatbot.weebly.com/)', inline: true },
        { name: 'Otros links', value: '[Servidor](https://discord.gg/9hCcKntSxk)\n[Pagina](https://puropenechristmas.neocities.org/blog/articulo?id=4)' }
      )
      .setColor('#FFB6C1') // rosa pastel
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: 'Chocotorta v1.0.0', iconURL: client.user.displayAvatarURL() });

    return message.channel.send({ embeds: [embed] });
  },
};
