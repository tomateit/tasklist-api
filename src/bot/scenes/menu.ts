import { Telegraf, ContextMessageUpdate } from "telegraf";
import { Markup } from "telegraf";


export default function help(telegraf: Telegraf<ContextMessageUpdate> ) {
    telegraf.command("menu", (ctx) => {
        ctx.reply('Custom buttons keyboard', 
        Markup
            .keyboard([
                // ['List commands', 'About'], // Row1 with 2 buttons
                // ['Get website pas', 'Authenticate'] , // Row3 with 3 buttons
                ['Schedules', 'Notes'], // Row2 with 2 buttons
            ])
            .oneTime()
            .resize()
            .extra()
      
        );
    })
}