import Telegraf from 'telegraf';


export default class TelegramBot {

    private telegraf: any;


    constructor(token: string|undefined) {
        this.telegraf = new Telegraf(token);
    }

    public launch(cb: ()=> void) {
        this.demo();
        this.telegraf.launch()
        cb()
    }

    private demo() {
        const bot = this.telegraf;
        bot.command('oldschool', (ctx: any) => ctx.reply('Hello'))
        // bot.command('modern', ({ reply: }) => reply('Yo'))
        bot.command('hipster', Telegraf.reply('λ'))
    }
}