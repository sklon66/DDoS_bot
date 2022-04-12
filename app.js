const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN)

const checkForMe = id => id === process.env.USER_ID;

bot.start( ctx => ctx.reply("Доброго вечора, ми з України"));

bot.on("text", ctx => {
    if (!checkForMe(ctx.update.message.from.id)) return;
    console.log(ctx.update.message)
    ctx.reply("пігнали досить")
})

bot.hears('check', (ctx) => {
    ps.lookup({ command: './db1000n' }, (err, resultList ) => {
        if (err) return console.log(err);

        const process = resultList[0];
        if (process) {
            ctx.reply('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
        } else {
            ctx.reply('No such process found!')
        }
    });
})

bot.launch();