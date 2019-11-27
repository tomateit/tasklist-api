import Telegraf  from 'telegraf';
import { ContextMessageUpdate } from "telegraf";
import { session } from "telegraf";
import { User } from "../server/models/user";
import help from "./scenes/help";
import menu from "./scenes/menu";
import { isUndefined } from 'util';

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
        this.help_script();
        this.menu_script();
        this.fallback_script();

        this.telegraf.launch();
        cb();
    }

    private start_script() {
        const bot = this.telegraf;
        bot.start(async (ctx: ContextMessageUpdate) => {
            if (isUndefined(ctx.from)) {
                return ctx.reply("Sorry, an error occured. The bot failed to start.");
            }
            const { first_name, last_name, username } = ctx.from;
            let name = username;
            if (first_name) {
                name = first_name;
                if (last_name) {
                    name += " " + last_name;
                }
            }
            const user = await User.authenticateFromTelegram(ctx.from);
            // if (no plans) don't mention it
            ctx.reply(`Hello, ${name}!
            Nice to have you here.
            Go and read the whole /help
            `);
        });
    }
    
    private help_script() {
        const bot = this.telegraf;
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
