const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const ms = require("ms");
const prefix = ";"
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

client.on("ready", () => {
  console.log("I'm awake, Chloe, running right now! :D");
});

client.on("message", (message) => {
       
    
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
    
  if(command === `${prefix}nsfwchloe`) {
  
      message.channel.send(process.env.CHLOE)
  
  }
    
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
  if (message.content.startsWith(prefix + "dev")) {
    message.channel.send("The Developer Of This Bot Is: `🌌Gekyume🌌#8443`");
  }
     if (message.content.startsWith(prefix + "ban")) {
        // Easy way to get member object though mentions.
        var member= message.mentions.members.first();
        // Kick
        member.kick().then((member) => {
            // Successmessage
            message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: ");
        }).catch(() => {
             // Failmessage
            message.channel.send("I cannot ban that user.");
        });
    }
  if (message.content.startsWith(prefix + "botPFP")) {
    client.user.setAvatar('https://cdn.discordapp.com/avatars/349985508518133781/a51a8a60bde57a37737c5acc734636ee.png');
    console.log("image pfp changed");
  }

  
   if(command === `${prefix}kick`) {  

let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Can't Find User!");
  let kReason = args.join(" ").slice(22);

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#c40910")
  .addField("Kicked User", `${kUser} With ID ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> With ID ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);

if(message.member.roles.some(r=>["fun coowner", "sad OWNER", "admin", "Owner", "Admin", "Admins", "Co-Owner", "Coowner"].includes(r.name)) ) {
  message.guild.member(kUser).kick(kReason);
  message.channel.send(kickEmbed);   
} else {
  message.channel.send("You cannot execute this command")
}
if(kReason > 1) {
  message.channel.send("You Must Provide A Reason :clipboard:")
}
     
return;
}
        if(command === `${prefix}ban`) {  

let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Can't Find User!");
  let bReason = args.join(" ").slice(22);

  let banEmbed = new Discord.RichEmbed()
  .setDescription("Ban")
  .setColor("#c40910")
  .addField("Banned User", `${bUser} With ID ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> With ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);


      
if(message.member.roles.some(r=>["fun coowner", "sad OWNER", "admin", "Owner", "Admin", "Admins", "Co-Owner", "Coowner", "Developer"].includes(r.name)) ) {
  message.guild.member(bUser).ban(bReason);
  message.channel.send(banEmbed);   
} else {
  message.channel.send("You cannot execute this command")
}
if(bReason < 1) {
  message.channel.send("Must Provide A Reason");
}     
     
    return;
  }
  
  if(command === `${prefix}aboutGek`) {
    message.channel.send("Geky bot is now a multipurpose bot ment to help servers any way they need it!");
  }
  
  if(command === `${prefix}help`) {
  
    message.channel.send(MODERATION);
      
    
        let MODERATION = new Discord.RichEmbed()
        .setDescription("**Commands**")
        .setColor("#c40910")
        .addField("Moderation", "`;ban @user reason --You Must Specify A Reason!!`  `;kick @user reason --Must Specify A Reason` FYI this is a test ATM this bot is very new and still in development")                                                                                           
        .addField("Fun", "WIP")
        .addField("Gambling", "WIP")
        .addField("Leveling", "WIP")
        .addField("Utility", "WIP")
        message.reply(MODERATION);
    }
  

    if(command === `${prefix}nohelp`) {
    
    message.channel.send("Ok! :ok_hand:")  
      
    }
    
    module.exports.run = async (bot, message, args) => {

if(command === `{prefix}tempmute`) {
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}
}
module.exports.help = {
  name: "tempmute"
}
  if(command === `{prefix}warn`)
  module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do pal!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("They waaaay too kewl");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(`name`, "staff");
  if(!warnchannel) return message.reply("Couldn't find channel");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create that role dude.");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 5){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> has been banned.`)
  }

}

module.exports.help = {
  name: "warn"
}
  
  
});

client.login(process.env.TOKEN);
