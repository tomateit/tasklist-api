import Telegraf  from 'telegraf';
import { session } from "telegraf";
import help from "./scenes/help";
import menu from "./scenes/menu";

export default class TelegramBot {

    private telegraf: any;


    constructor(token: string|undefined) {
        if (!token) {
            throw new Error("NO TOKEN PROVIDED");
        }
        this.telegraf = new Telegraf(token);
    }

    public launch(cb: ()=> void) {
        this.demo();
        this.start_script();
        this.menu_script();
        this.fallback_script();

        this.telegraf.launch();
        cb();
    }

    private start_script() {
        const bot = this.telegraf;
        bot.start((ctx:any) => ctx.reply("Bot started. "));
        help(bot);
    }

    private menu_script() {
        const bot = this.telegraf;

        menu(bot);
    }

    private demo() {
        const bot = this.telegraf;
        bot.command('meta', (ctx: any) => ctx.reply(`from: ${JSON.stringify(ctx.from, null, 2)} \n chat: ${JSON.stringify(ctx.chat, null, 2)} \n updateType: ${ctx.updateType} \n updateSubTypes: ${ctx.updateSubTypes}`));
        // bot.command('modern', ({ reply: }) => reply('Yo'))
        bot.command('hipster', Telegraf.reply('λ'));
    }

    private fallback_script() {
        const bot = this.telegraf;
        bot.catch((err: any, ctx: any) => {
            console.error(`ERR_TGBOT on ${ctx.updateType}`, err);
        })
    }
}
