const Discord = require('discord.js')
const config = require('./config.json')
const package = require('./package.json')
const client = new Discord.Client({ disableEveryone: true })
const fs = require('fs')
const fetch = require("node-fetch")

client.on('ready', async () => {
  console.log(`${client.user.username} v${package.version} is on.`)
  client.user.setActivity(
    "いも",
  )
  rest = Date.now()
  

})
client.on('message', async message => {
  const args = message.content.substring(config.prefix.length).split(' ')
  const url = args[1]
  if(args[0]=="help") message.channel.send("開発者Twitter: @pokochanuwu")
  if(message.content.match("!conv")){
    const url = args[1]
      const seat = url.match(/&tw=\d/)[0].replaceAll(/\D/g, "")
      const req = url.replace(/tenhou.net\/\d\/\?log=/, "tenhou.net/5/mjlog2json.cgi?").replace(/&tw=\d/, "")
      fetch(req)
      .then((response) => {
          if (!response.ok) {
              throw new Error();
          }
          return response.json();
      })
      .then(async (js) => {
          js.rule.disp = js.rule.disp.replace("東", "南")
          for (let i = 0; i < js.log.length; i++) {
              const kyoku = js.log[i];
              kyoku[0][0]+=4
          }
          fs.writeFile("paihu.txt", JSON.stringify(js), {flag: "w"}, (e)=>{console.error(e)})
          await message.channel
              .send(
                `TargetPlayer: ${seat}\nCustom log (tenhou.net/6 JSON)`,
                { files: [`./paihu.txt`] },
              ).catch(err => console.log(err))
            fs.unlink(`paihu.txt`, err => {
              if (err) console.log('error on unlink' + err)
            })
      })
      .catch((reason) => {
          console.log(reason);
      })
    }
  if(message.content.match("!serversinfo")){
          message.channel.send(client.guilds.cache.size)
  }
})
client.login(config.token).catch(e=>console.error(e))
