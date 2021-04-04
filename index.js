const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const ms = require('ms')
const moment = require('moment')
const isgd = require('isgd')
const guild = require('guild')
const { measureMemory } = require('vm')
const {embedcolor,prefix,token, activity} = require("./config.json")
client.login(token);
client.on("ready", () => {
  client.user.setActivity(activity, {type:"PLAYING"});
})

//==={help}===\\
client.on("message", message => {
  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.cotnent === prefix+"help") {
    var embed = new Discord.MessageEmbed()
    .setTitle(`${client.user.username} Info`)
    .addField(`${prefix}server`,` Give You Server Info`,true)
    .addField(`${prefix}user`,` Give You User Info`,true)
    .addField(`${prefix}avatar`,` Give You Avatar User`,true)
    .addField(`${prefix}savatar`,` Give You Server Avatar`,true)
    .addField(`${prefix}bot`,` Give You Bot Info`,true)
    .addField(`${prefix}allbot`,`Upload The The Bots Info To A Online Note`,true)
    .addField(`${prefix}ping`,`See Bot Speed Connetion`,true)
    .addField(`${prefix}kick`,` Kick Some User`,true)
    .addField(`${prefix}ban`,`Ban Mentioned User`,true)
    .addField(`${prefix}allbans`,` See All Bans Size`,true)
    .addField(`${prefix}lock`,` Lock The Channel`,true)
    .addField(`${prefix}unlock`,` Unlock The Channel`,true)
    .addField(`${prefix}hide`,`Hide The Channel`,true)
    .addField(`${prefix}`,``,true)
    .addField(`${prefix}`,``,true)
    message.channel.send(embed)
  }
})
//==={server}===\\
client.on("message", messaage => {
    if(messaage.author.bot) return;
    if(!messaage.guild) return;
    if(messaage.content === prefix+"server") {
        messaage.guild.members.fetch().then(m => {
            const online = m.filter(member => member.presence.status === 'online');
            const Idle = m.filter(member => member.presence.status === 'idle');
            const dnd = m.filter(member => member.presence.status === 'dnd');
            const offline = m.filter(member => member.presence.status === 'offline');
            const on = m.filter(member => member.presence.status !== 'offline');
            var embed = new Discord.MessageEmbed()
            .setAuthor(messaage.guild.name, messaage.guild.iconURL({dynamic:true}))
            .addField(` Server ID:`,`${messaage.guild.id}`,true)
            .addField(` Created On`,`${moment(messaage.guild.createdAt).format("LLL")}`,true)
            .addField(` Owned by`,`${messaage.guild.owner}`,true)
            .addField(` Members ${messaage.guild.memberCount}`,`${on.size} Online
            ${messaage.guild.premiumSubscriptionCount} Boosts :sparkles:`,true)
            .addField(` Channels (${messaage.guild.channels.cache.size})`,`**${messaage.guild.channels.cache.filter(m => m.type == "text").size}** Text |  **${messaage.guild.channels.cache.filter(m => m.type == "voice").size}** Voice`,true)
            .addField(` Others`,`**Region:** ${messaage.guild.region}
            **Verification Level:** ${messaage.guild.verificationLevel}`,true)
            messaage.channel.send(embed)
        })
    }
})
//==={user}===\\
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase().startsWith(prefix+"user")) {
        var user = message.mentions.users.first() || client.users.cache.get(message.content.split(" ")[1]) || message.author;
        var mem = message.mentions.members.first() || client.users.cache.get(message.content.split(" ")[1]) || message.member;
      
            
            var embed = new Discord.MessageEmbed()
            .setTitle(`${user.username} Avatar Link`)
            .setAuthor(user.username, user.avatarURL({dynamic:true}))
            .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL({dynamic:true}))
            .setURL(user.avatarURL({dynamic:true,size:2048}))
            .setDescription(`Nick Name: ${user.nickname || "**No Nick Name**"}`)
            .setThumbnail(user.avatarURL({dynamic:true}))
            .setTimestamp()
            .addField(`User Id`,`${user.id}`,true)
            .addField(`User Account Created At`,`[${moment(user.createdAt).format("LLL")}]`,true)
            .addField(`User Joined At`,`[${moment(mem.joinedAt).format("LLL")}]`,true)
            //.addField(`User Status`,`${status}`,true)
        //    .addField(`User Bot`,`${w}`,true)
            .setColor(embedcolor)
            message.channel.send(embed)
        
        
    }
})
//==={avatar}===\\
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase().startsWith(prefix+"avatar")) {
        var user = message.mentions.users.first() || client.users.cache.get(message.content.split(" ")[1]) || message.author;
        var embed = new Discord.MessageEmbed()
        .setTitle(`${user.username} Link`)
        .setURL(user.avatarURL({dynamic:true,size:2048}))
        .setImage(user.avatarURL({dynamic:true,size:2048}))
        .setColor(embedcolor)
        message.channel.send(embed)
    }
})
//==={savatar}===\\
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase() === prefix+"savatar") {
        var embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name} Link`)
        .setURL(message.guild.iconURL())
        .setImage(message.guild.iconURL({dynamic:true,size:2048}))
        .setColor(embedcolor)
        message.channel.send(embed)
    }
})
//==={bot}===\\
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase() === prefix+"bot") {
        var embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle(`${client.user.username} Bot Info`)
        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor(embedcolor)
        .setThumbnail(client.user.avatarURL({size:2048}))
        .addField(`In Servers: `,`[${client.guilds.cache.size} Server]`)
        .addField(`With Users:`,` [${client.users.cache.size} User]`)
        .addField(`Bot Prefix:`,`[${prefix}]`)
       // .addField(`Bot Devloper:`,`[<@${devs}>]`)
        .addField(`Bot Status`,`[${client.ws.status}]`)
        message.channel.send(embed)
    }
})
//==={short}===\\

//==={allbot}===\\
const nosmy = require("nomsy-paste")
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase() === prefix+"allbot") {
        message.guild.members.fetch().then(member => {
            var num = 1;
            var bots = member.filter(m => m.user.bot).map(m => `${num++} - <@${m.id}> Bot \n ${m.user.username} Bot Name \n [${m.id}] `)
            nosmy(bots.join("\n==================\n"),"js").then(allbotsinserver => {
            var embed = new Discord.MessageEmbed()
            .setTitle(`${member.filter(m =>m.user.bot).size} Bots `)
            .setDescription(`[Click Me](${allbotsinserver})`)
            .setColor(embedcolor)
            .setTimestamp()
            message.channel.send(embed)
            })
        })
    }
})
//==={ping}===\\
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase() === prefix+"ping") {
        var embed = new Discord.MessageEmbed()
        .setTitle(`Bot Ping`)
        .setDescription(`Time Taken **${new Date - message.createdTimestamp}** \n WebSocket: **${client.ws.ping}**`)
        .setColor(embedcolor)
        .setTimestamp()
        message.channel.send(embed)
    }
})
//Kick
client.on("message", message => {
    if(message.author.bot)return;
    if(!message.guild) return;
    if(message.content.toLowerCase().startsWith(prefix+"kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply(`You Cant You Dont Have \`Kick Members\` Perms`);
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply(`i Dont Have \`Kick Members\` Perms`);
        var user = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]);
        if(user) {
            var member = message.mentions.members.first();
            if(member) {
                member.kick(user).then(m => {
                    message.channel.send(`Done Kicked ${user.username} From The Server`)
                })
            } else {
                message.channel.send(`I Cant Find This Member`)
            }
        } else {
            message.channel.send(`I Cant Kick This Member Please Check My Permissions`)
        }
    }
})
//==={ban}===\\
client.on("message", message => {
    if(message.author.bot)return;
    if(!message.guild) return;
    if(message.content.toLowerCase().startsWith(prefix+"ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply(`You Cant You Dont Have \`BAN_MEMBERS\` Perms`);
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply(`i Dont Have \`BAN_MEMBERS\` Perms`);
        var user = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]);
        if(user) {
            var member = message.mentions.members.first();
            if(member) {
                member.ban(user).then(m => {
                    message.channel.send(`Done Banned ${user.username} From The Server`)
                })
            } else {
                message.channel.send(`I Cant Find This Member`)
            }
        } else {
            message.channel.send(`I Cant Ban This Member Please Check My Permissions`)
        }
    }
})
//
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase() === prefix+"allbans") {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send(`You Cant You Dont Have \`BAN_MEMBERS\` Perms`);
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(`I Dont Have \`BAN_MMEBER\` Perms`);
        message.guild.fetchBans().then(bans => {
            message.channel.send("```"+bans.size+" Banned Members```")
        });
    }
});
//
//
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase().startsWith(prefix+"lock")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You Dont Have \`MANAGE_CHANNELS\` Perms`);
        if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`I Dont Have \`MANAGE_CHANNELS\` Perms`);
        var channel = message.mentions.channels.first() || message.channel;
        channel.createOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        })
        message.channel.send(`Done Locked ${channel} Channel`);
    }
})
//
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase().startsWith(prefix+"unlock")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You Dont Have \`MANAGE_CHANNELS\` Perms`);
        if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`I Dont Have \`MANAGE_CHANNELS\` Perms`);
        var channel = message.mentions.channels.first() || message.channel;
        channel.createOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        })
        message.channel.send(`Done UnLocked ${channel} Channel`);
    }
})
//
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase().startsWith(prefix+"hide")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You Dont Have \`MANAGE_CHANNELS\` Perms`);
        if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`I Dont Have \`MANAGE_CHANNELS\` Perms`);
        var channel = message.mentions.channels.first() || message.channel;
        channel.createOverwrite(message.guild.id, {
            VIEW_CHANNEL: false
        })
        message.channel.send(`Done Hide ${channel} Channel`);
    }
})
//
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.toLowerCase().startsWith(prefix+"show")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You Dont Have \`MANAGE_CHANNELS\` Perms`);
        if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`I Dont Have \`MANAGE_CHANNELS\` Perms`);
        var channel = message.mentions.channels.first() || message.channel;
        channel.createOverwrite(message.guild.id, {
            VIEW_CHANNEL: true
        })
        message.channel.send(`Done Show ${channel} Channel`);
    }
})
//

//

//

//
client.on("message", message => {
    if(message.author.bot) return;
    if(!message.guild ) return;
    if(message.content.toLowerCase().startsWith(prefix+"role")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send(`You Dont Have \`MANAGE ROLES\` Perms`);
        if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(`I Dont Have \`MANAGE ROLES\` Perms`);
        var args = message.content.split(" ").slice(1).join(" ");
        var role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase() === args);
        if(!role) return message.channel.send(`You Must Type Role Name Or Mention The Role`);
        var user = message.mentions.users.first();
        if(user) {
            var member = message.mentions.members.first();
            if(member) {
                member.roles.add(role)
                message.channel.send(`Done Added ${role} For ${user}`)
            } else {
                message.channel.send(`I Cant Find The Member`)
            } 
        } else {
            message.channel.send(`I Cant Give The Member The Role Check My Permissions`)
        }
    }
})
//

//

//




