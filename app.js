const { Telegraf } = require('telegraf');
const shell = require('shelljs');
const ps = require('ps-node');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN)

const checkForMe = id => id === +process.env.USER_ID;

const checkProcess = async (command) => {
    return new Promise((res, rej) => {
        ps.lookup({ command }, (err, resultList ) => {
            if (err) rej(err);
            if (resultList[0]) {
                res(resultList[0].command)
            } else {
                res()
            }
        });
    })
}

bot.start( ctx => ctx.reply("Доброго вечора, ми з України"));

bot.hears('check', async (ctx) => {
    if (!checkForMe(ctx.update.message.from.id)) return;
    const aliveProces = [];
    for (const command of process.env.PROCESSES_FIND.split(" ")) {
        const process = await checkProcess(command);
        if (process) aliveProces.push(process);
    }
    if (aliveProces.length === 0) {
        ctx.reply("no alive process");
        return
    }
    ctx.reply(aliveProces.join(" "));
})

bot.hears('exec', async ctx => {
    for (const comand of process.env.PROCESSES_START.split(" ")) {
        shell.exec(`../comand`, {async:true});
    }
})

bot.launch();