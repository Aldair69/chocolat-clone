const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { prefix, token } = require('./config.json');

// Asignar categoria a las carpetas
function getCategoria(folder) {
  switch (folder) {
    case 'config': return 'Comandos de Configuración';
    case 'fun': return 'Comandos Divertidos';
    case 'info': return 'Comandos Informativos';
    case 'mod': return 'Comandos ADMIN/MOD';
    case 'react': return 'Comandos de Reacción';
    case 'interact': return 'Comandos de Interacción';
    case 'search': return 'Comandos de Búsqueda';
    case 'util': return 'Comandos Útiles';
    case 'music': return 'Comandos de Música';
    default: return 'Sin categoría';
  }
}

// Cliente y intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();

const comandosPath = path.join(__dirname, 'comandos');
const carpetas = fs.readdirSync(comandosPath);

for (const carpeta of carpetas) {
  const carpetaPath = path.join(comandosPath, carpeta);
  if (!fs.statSync(carpetaPath).isDirectory()) continue; // Ignorar archivos sueltos

  const archivos = fs.readdirSync(carpetaPath).filter(file => file.endsWith('.js'));

  for (const archivo of archivos) {
    const ruta = path.join(carpetaPath, archivo);
    const command = require(ruta);

    if (!command.name || typeof command.execute !== 'function') {
      console.warn(`Comando inválido en ${ruta}`);
      continue;
    }

    // Asignar la categoría al comando
    command.categoria = getCategoria(carpeta);

    // Agregar a la colección
    client.commands.set(command.name, command);
  }
}

// Evento cuando la bot esta lista
client.once('ready', () => {
  console.log(`¡Listo! ${client.user.tag} está encendida`);
  client.user.setPresence({ activities: [{ name: prefix+'help' }] });
});

// Restricciones, anticrash y ejecutor de los comandos.
client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    await message.reply('Hubo un error al ejecutar el comando.');
  }
});

// Login 
client.login(token);
