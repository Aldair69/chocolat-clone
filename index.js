const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');

// Crear un nuevo cliente de Discord con los intents necesarios
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Para eventos relacionados con los servidores
    GatewayIntentBits.GuildMessages, // Para mensajes en servidores
    GatewayIntentBits.MessageContent, // Para leer el contenido de los mensajes
  ],
});

// Crear una colección para almacenar los comandos
client.commands = new Collection();

// Cargar los comandos desde la carpeta ./comandos
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);
}

// Evento cuando el bot está listo
client.once('ready', () => {
  console.log(`Listo! ${client.user.tag} está encendida`);
});

// Evento para manejar mensajes
client.on('messageCreate', async (message) => {
  // Ignorar mensajes del propio bot o que no comienzan con el prefijo
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  // Parsear el mensaje para obtener el comando y los argumentos
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Buscar el comando en la colección
  const command = client.commands.get(commandName);

  if (!command) return; // Si no existe el comando, simplemente ignora

  try {
    // Ejecutar el comando
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    await message.reply('Hubo un error al ejecutar el comando.');
  }
});
// Iniciar sesión con el token del bot
client.login(token);
