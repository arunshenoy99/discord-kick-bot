const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'Moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You cannot use this command.");
    const mentionedMember = message.mentions.members.first();
    if (args.length === 1) {
      var reason = "no reason (might be trying to play with him lol :/)"
    } else {
      var reason = args[1]
    }
    const kickEmbed = new Discord.MessageEmbed()
     .setTitle(`You were kicked from ${message.guild.name}`)
     .setDescription(`Reason: ${reason}`)
     .setColor("#24f00a")
     .setTimestamp()
     .setFooter(client.user.tag, client.user.displayAvatarURL());
    
    if (!args[0]) return message.channel.send("You need to state a user to kick: Try the command like this \'$kick @user reason\'");
    if (!mentionedMember) return message.channel.send("The member mentioned is not in the server.");
    try {
    await mentionedMember.send(kickEmbed);
    } catch (err) {
      console.log('I was unable to message the member.');
    }

    try {
      await mentionedMember.kick(reason)
      message.channel.send(`<@${mentionedMember.id}> was kicked by <@${message.member.id}>. Reason: ${reason}`)
    } catch (err) {
      console.log(err);
      return message.channel.send("I was unable to kick the user Reason:" + err)
    }
  }
}