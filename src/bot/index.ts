import Telegraf  from 'telegraf';


export default class TelegramBot {

    private telegraf: any;


    constructor(token: string|undefined) {
        if (!token) {
            throw new Error("NO TOKEN PROVIDED")
        }
        this.telegraf = new Telegraf(token);
    }

    public launch(cb: ()=> void) {
        this.demo();
        this.start_script();
        this.fallback_script();

        this.telegraf.launch()
        cb()
    }

    private start_script() {
        const bot = this.telegraf;
        bot.start((ctx:any) => ctx.reply("Hello!"))
    }

    private demo() {
        const bot = this.telegraf;
        bot.command('meta', (ctx: any) => ctx.reply(`from: ${ctx.from} \n chat: ${ctx.chat} \n updateType: ${ctx.updateType} \n updateSubTypes: ${ctx.updateSubTypes}`))
        // bot.command('modern', ({ reply: }) => reply('Yo'))
        bot.command('hipster', Telegraf.reply('λ'))
    }

    private fallback_script() {
        const bot = this.telegraf;
        bot.catch((err: any, ctx: any) => {
            console.error(`ERR_TGBOT on ${ctx.updateType}`, err)
        })
    }
}