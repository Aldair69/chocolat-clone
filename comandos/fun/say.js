
module.exports = {
  name: 'say',
  description: 'Repite el mensaje proporcionado.',
  execute(message, args) {
     const messageContent = args.join(' ');

    // Verificar si el mensaje esta vacio porque si no se me rompe el bot XD
    if (!messageContent) {
      return message.channel.send('Por favor, proporciona un mensaje para repetir.');
    }
    message.channel.send(messageContent);
  }
};
