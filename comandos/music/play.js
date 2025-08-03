const { EmbedBuilder } = require('discord.js');
const yt = require('youtube-search-without-api-key'); // No quiero ser demandada asi que usaremos una api que no use la api de yt
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  getVoiceConnection
} = require('@discordjs/voice');
const ytdl = require('@distube/ytdl-core');
const fs = require('fs');
const agent = ytdl.createAgent(JSON.parse(fs.readFileSync('cookies.json'))); // Yt mostrara que eres un robot si no das cookies
// Era mas facil que hacer un sistemas usando pipeextractor de pipepipe

if (!global.queueMap) global.queueMap = new Map();

module.exports = {
  name: 'play',
  description: 'Reproduce audio de YouTube en un canal de voz',

  async execute(message, args) {
    const results = await yt.search(args.join(' '));
    const songURL = results[0].url;
    const voiceChannel = message.member.voice.channel;
    const guildId = message.guild.id;

    if (!voiceChannel) {
      return message.reply('¡Debes unirte a un canal de voz primero!');
    }

    const url = songURL;
    if (!url || !ytdl.validateURL(url)) {
      return message.reply('Por favor proporciona un enlace válido de YouTube.');
    }

    let info;
    try {
      info = await ytdl.getInfo(url);
    } catch (err) {
      console.error(err);
      return message.reply('❌ No pude obtener información del video.');
    }

    const title = info.videoDetails.title;
    const thumbnail = info.videoDetails.thumbnails?.at(-1)?.url;

    // Iniciar cola si no existe
    if (!queueMap.has(guildId)) {
      queueMap.set(guildId, {
        connection: null,
        player: createAudioPlayer(),
        songs: [],
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        playing: false,
        currentSong: null,
      });
    }

    const serverQueue = queueMap.get(guildId);
    serverQueue.songs.push({
      title,
      url,
      thumbnail,
      requestedBy: message.member.toString()
    });

    // Muestra la cancion que pusiste en queue
    // Se ve raro cuando la primera cancion esta en la lista pero soy muy floja para arreglarlo
    const embedEnlistado = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle('✅ Enlistado:')
      .setDescription(`**${title}**\nPedido por\n${message.member.toString()}`)
      .setThumbnail(thumbnail);
    await message.channel.send({ embeds: [embedEnlistado] });

    // Si ya está reproduciendo, solo muestra la cola
    if (serverQueue.playing) {
      return showQueue(serverQueue);
    }

    // Iniciar reproducción
    playNext(guildId);
  },
};

// Play siguiente cancion
async function playNext(guildId) {
  const serverQueue = queueMap.get(guildId);
  const song = serverQueue.songs.shift();

  if (!song) {
    serverQueue.currentSong = null;
    serverQueue.textChannel.send({
      embeds: [new EmbedBuilder().setColor(0x2f3136).setDescription('⏹️ Reproducción terminada.')]
    });
    getVoiceConnection(guildId)?.destroy();
    queueMap.delete(guildId);
    return;
  }

  serverQueue.currentSong = song;
  serverQueue.playing = true;

  try {
    const stream = ytdl(song.url, {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25
    });

    const resource = createAudioResource(stream);
    serverQueue.player.play(resource);

    if (!serverQueue.connection) {
      serverQueue.connection = joinVoiceChannel({
        channelId: serverQueue.voiceChannel.id,
        guildId: guildId,
        adapterCreator: serverQueue.voiceChannel.guild.voiceAdapterCreator
      });
      serverQueue.connection.subscribe(serverQueue.player);
    }

    // Embed: Reproduciendo ahora
    const embedPlaying = new EmbedBuilder()
      .setColor(0x2f3136)
      .setDescription(`🎵 Reproduciendo ahora: **${song.title}**`)
      .setThumbnail(song.thumbnail);
    await serverQueue.textChannel.send({ embeds: [embedPlaying] });

    // Actualizar cola mostrando el estado
    await showQueue(serverQueue);

    serverQueue.player.once(AudioPlayerStatus.Idle, () => {
      serverQueue.playing = false;
      playNext(guildId);
    });

  } catch (err) {
    console.error('Error reproduciendo canción:', err);
    serverQueue.textChannel.send('⚠️ Hubo un problema al reproducir la canción. Saltando...');
    serverQueue.playing = false;
    playNext(guildId);
  }
}

// Cancion actual
// Esta es una remanente de un codigo viejo de cuando queue estaba integrado aca para ahorrar tiempo
// No se como ni cuando pero hace que no se registre la primera cancion de la lista de reproduccion si se elimina
// Es el equivalente a la textura de el coco en tf2
async function showQueue(serverQueue) {
  const currentSong = serverQueue.currentSong;
}
