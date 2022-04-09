const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "warn",
        description: "warn members",
        usage: "m/warn <mention member/member id> [reason]",
        aliases: []
    },
    run: async (bot, message, args) => {
        let warnPermErr = new MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Sorry, you don't have permissions to use this! ❌**")
            if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send(warnPermErr);
    
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.reply("Please mention a valid member of this server");
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "(No Reason Provided)";
            
            member.send(`Kaptál egy figyelmeztetést <${message.author.username}> admintól, ezért: ${reason}`)
            .catch(error => message.channel.send(`Sorry <${message.author}> I couldn't n't warn because of : ${error}`));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__FIGYELMEZTETÉS__**")
            .setDescription(`**<@${member.user.id}> figyelmeztetve lett <@${message.author.id}>** által.`)
            .addField(`**Oka:**`, `\`${reason}\``)
            .addField(`**Művelet:**`, `\`Figyelmeztetés\``)
            .addField(`**Moderátor:**`, `${message.author}`)

            message.channel.send(warnEmbed)

    }
}