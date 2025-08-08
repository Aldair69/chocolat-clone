// Este si lo documentare XD
module.exports = {
  name: 'purge',
  description: 'Borra mensajes.',
  async execute(message, args) {
  // Si el primer argumento no existe no hay nada
  if (!args[0]) return message.channel.send('Por favor, proporciona argumentos');
  // Si args[0] no es mencion, id o nombre
  if (
    message.mentions.users.first() ||                                   // mencion
    /^\d{17,19}$/.test(args[0]) ||                                      // ID
    message.guild.members.cache.find(m => 
        m.user.username.toLowerCase() === args[0].toLowerCase()         // nombre (el lowercase es mas facil que startswith)
    )) {
  var borrar = args[1]
  let member;
  // Usar el nombre de usuario, ID o mencion a un usuario
  if(args[0]) member = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.guild.members.cache.find(p => p.user.username.startsWith(args[0]))
  if(borrar > 100 || borrar < 1 || isNaN(borrar)) return message.channel.send('Por favor, proporciona argumentos validos'); // Skipear si los argumentos estan mal 
  message.delete() // Message delete esta duplicado pq si lo hacemos depues del fetch la api regresa DiscordAPIError[10008]: Unknown Message 
  const messages = await message.channel.messages.fetch({limit: 100})// Fetcheamos aca para luego filtrar 
  // Si hay un usuario filtra los mensajes ese usuario, que no estén fijados y que no sean del sistema, si no hay solo filtra que no estén fijados y que no sean del sistema 'Discord'
  let filtro = member ? m => m.author.id == member.id && !m.pinned && !m.system : m => !m.pinned && !m.system
  let msg = messages.filter(filtro)// Filtro a messages que es la variable donde están todos los mensajes
  
  if([...msg.values()].length < 1) return message.channel.send('No hay mensajes para eliminar')
  // Usamos '(msg).array()' para pasar los datos a un array y usar 'slice()' para tomar desde 0 hasta la cantidad dada por el usuario o establecida anteriormente
  // ...msg.values() es el equivalente a un .array desde discord.js 14 :P
  message.channel.bulkDelete([...msg.values()].slice(0, borrar), true)
  
  } else { 
  var borrar = args[0];
  if(borrar > 100 || borrar < 1 || isNaN(borrar)) return message.channel.send('Por favor, proporciona argumentos validos'); // Skipear si los argumentos estan mal 
  message.delete()
  await message.channel.messages.fetch({limit: borrar}).then 
   (async messages => {
    message.channel.bulkDelete(messages) });}
 }, // Fin
};
