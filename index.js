const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./settings.json")
const fs = require("fs")

async function reload() {
    configs = require("./settings.json");
}

client.on("ready", async () => {

    console.log(`${client.user.tag} adlı self bot aktif!`)

})

const sleep = ms => new Promise(res => setTimeout(res, ms));

const rowyData = new Map()

async function ekle(message, args) {
    let id = args[1];
    let ayarlar = require(`./settings.json`, `utf-8`);
    if (!ayarlar.blacklisted.includes(id)) {
      ayarlar.blacklisted.push(id);
      fs.writeFileSync("./settings.json", JSON.stringify(ayarlar), `utf-8`);
      reload();
      message.channel.send(`${message.author}, Başarıyla \`${id}\` idli kullanıcı karalisteye eklendi!`);
    } else {
      message.channel.send(`${message.author}, \`${id}\` idli kullanıcı zaten karalistede ekli!`);
    }
  }

async function cikar(message, args) {
    let id = args[1];
    let ayarlar = require(`./settings.json`, `utf-8`);
    if (ayarlar.blacklisted.includes(id)) {
      let ahmetxsad = ayarlar.blacklisted.filter(function(item) {
        return item !== args[1];
      });
      ayarlar.blacklisted = ahmetxsad;
      fs.writeFileSync("./settings.json", JSON.stringify(ayarlar), `utf-8`);
      reload();
      message.channel.send(`${message.author}, Başarıyla \`${id}\` idli kullanıcı karalisteden çıkartıldı!`);
    } else {
      message.channel.send(`${message.author}, \`${id}\` idli kullanıcı zaten karalistede değil!`);
    }
  }

client.on("message", async (message) => {

    let args = message.content.split(" ").slice(1)

    /*if(message.content.toLocaleLowerCase().startsWith(config.prefix + "selfbot")) {

        if(!args[0]) return message.channel.send(`${message.author}, Selfbot sistemini açmak/kapatmak için lütfen \`${config.prefix}selfbot true\` veya \`${config.prefix}selfbot false\` yazınız.\nSelfBot Durumu: **${config.selfbot.replace("true", "Açık").replace("false", "Kapalı")}**`)

        let ayar = ["true", "false"];
        let ayarlar = args[0];
        if(!ayar.includes(ayarlar)) return message.channel.send(`${message.author}, lütfen \`true\` veya \`false\` değerlerini kullanın!`)

        if(ayarlar === "true") {

            let selfbots = require(`./settings.json`, `utf-8`);
            if(selfbots.selfbot !== true) {
            if (selfbots.selfbot.includes(ayar)) {
            selfbots.selfbot.push(ayar)
            fs.writeFileSync("./settings.json", JSON.stringify(selfbots), `utf-8`);
            reload();
            message.channel.send(`${message.author}, Self-Bot sistemi başarıyla açıldı!`)
            } else {
            message.channel.send(`${message.author}, Self-Bot sistemi zaten aktif!`)
            }

        }}

        if(ayarlar === "false") {

            let selfbots = require(`./settings.json`, `utf-8`);
            if(selfbots.selfbot == true) {
            if (selfbots.selfbot.includes(ayar)) {
                selfbots.selfbot.push(ayar)
                fs.writeFileSync("./settings.json", JSON.stringify(selfbots), `utf-8`);
                reload();
                message.channel.send(`${message.author}, Self-Bot sistemi başarıyla kapatıldı!`)
                } else {
                message.channel.send(`${message.author}, Self-Bot sistemi zaten kapalı!`)
                }
            }
        }

    }*/

    if(config.selfbot !== "true") return;
    if(message.author.id !== client.user.id && message.author.bot) return;

    if(message.content.toLocaleLowerCase().startsWith(config.prefix + "karaliste")) {
        
        let blacklisted = config.blacklisted || []

        if(!args[0] || !args[1]) return message.channel.send(`${message.author}, geçersiz terim girildi lütfen \`ekle <id>\` veya \`çıkar <id>\` terimlerini kullanın.\n\n${blacklisted.length > 0 ? "Karalistede şuanda **" + blacklisted.length + "** kişi bulunuyor.\n"+ blacklisted.map(rowy => "<@" + rowy + ">") : "Karalistede kayıtlı biri bulunmamakta."}`)

        let ayar = ["ekle", "çıkar"];
        let ayarlar = args[0].toLocaleLowerCase();
        if(!ayar.includes(ayarlar) || !parseInt(args[1])) return message.channel.send(`${message.author}, lütfen sayısal değer girin.`)

        if(ayarlar === "ekle") return ekle(message, args)
        if(ayarlar === "çıkar") return cikar(message, args)
    }

})

client.on("message", async (message) => {

    let rowyRandomList = [
        "j4j dm",
        "J4j dm fast",
        "J4j dm me fast no alts and new accounts",
        "J4J dm me no bot fast pls pick",
        "j4j dm no alt&bot",
        "j4j need invites pls dm rn",
        "♡J4j fast dm legit♡",
        "J4j dm me pls",
        "j4j fast dm",
        "join for join",
        "fast j4j dm mek",
        "join for join go go go go",
        "join for join fast dm dm",
        "join for join dm",
        "j4j dm me fast",
        "j4j dm no new acc",
        "j4j dm me fast no bot or alts",
        "J4j dm fast all please",
        "J4j dm me quick",
        "J4j dm fast please",
        "♡♡J4j fast dm legit♡♡",
        "♡♡J4j dm fast please♡♡",
        "j4j go go♡",
        "J4j dm me fast no alts and new accounts♡",
        ".join for join dm me I will not leave",
        "j4j dm asap (old acc + i don’t leave)",
        "j4j dm me fast i am on cooldown"
      ];

      var randomMessage = Math.floor(Math.random() * rowyRandomList.length);

    if(message.content.toLocaleLowerCase() === "j4j") {
        message.channel.send(`${rowyRandomList[randomMessage]}`);
    };

    if(message.content.toLocaleLowerCase() === "j4j dm") {
        message.channel.send(`${rowyRandomList[randomMessage]}`);
    };

    if(message.content.toLocaleLowerCase() === "j4j dm no bot") {
        message.channel.send(`${rowyRandomList[randomMessage]}`);
    };

    if(message.content.toLocaleLowerCase() === "fast j4j") {
        message.channel.send(`${rowyRandomList[randomMessage]}`);
    };

})

client.on("message", async (message) => {

    if(message.channel.type === 'dm') {

    if(config.blacklisted.includes(message.author.id)) return console.log("Blacklistte kayıtlı biri vardı!: " + message.author.tag + "(" + message.author.id + ")");
    if(message.author.id === client.user.id) return;
    if(message.author.bot) return;

    let rowywashere = await rowyData.get(message.author.id);
    if(rowywashere === 1) {
    console.log("Adam tekrar yazdı sistemi adama karşı durdurdum komtanum!")
    } else {
    
    await rowyData.set(message.author.id, 1);
    await sleep(15000);
    await message.channel.send("Hi, " + message.author)
    await sleep(25000);
    await message.channel.send("Please join https://discord.gg/" + config.discordlink)
    await sleep(50000)
    await message.channel.send("Heey bro! I see you didint join my server,please join")

}
}

})

client.login(config.token)