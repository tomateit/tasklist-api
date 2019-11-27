import { Telegraf, ContextMessageUpdate } from "telegraf";
import { Markup } from "telegraf";

export default function help(telegraf: Telegraf<ContextMessageUpdate> ) {
    telegraf.help((ctx) => {
        ctx.reply('Custom buttons keyboard', 
            Markup
                .keyboard([
                    ['List commands'], // Row1 with 2 buttons
                    ['Basic usage'],
                    ['Managing plans', 'Managing goals'], // Row2 with 2 buttons
                    ['Managing notes'] // Row3 with 3 buttons
                ])
                .oneTime()
                .resize()
                .extra()
        
        );

    })
    telegraf.hears('List commands', ({reply}) => {
        reply(`
            /help - invoke help menu \n
            /menu - show main menu \n
            /authenticate - if you have already registered via website \n
            /getwebsitepassword" - one-time access key for web-version 
        `)
    })

    telegraf.hears('Managing plans', ({reply}) => {
        reply(`
            Plans are lists of tiny goals in fixed order.
            Plans have two attributes: \n
            - schedule (your plan is divided into some periods of time) \n
            - checklist (has tick marks for each goal) \n
            You can use both of these attributes at once if you want!
        `)
    })

    telegraf.hears('Managing goals', ({reply}) => {
        reply(`
            Goals are building blocks on the way of achieving something.
            Imagine your dream, and try to say, what goals have to come true in order to make this dream a reality.

            Goals have the following attributes: \n
            - Class: you can group different activities by their class. Once in plans, use "random placeholders" which will take a random goal of a specific class to enliven daily routine.  \n
            - Type: goals can be of two types - recurring (which you can do regularly), and single (or "one-time") goals. The first one have time marker, the second one have tick marker.  \n
            - Steps: optional feature which allows you to subdivide your goal into even smaller steps (e.g. if your goal is to read a book, you can use its chapters as steps)
        `)
    })

    telegraf.hears('Basic usage', ({reply}) => {
        reply(`
            We belive that your goals have to adjust tou your comfortable life schedule, not vice versa.
            Thus, the basic way of using the app has the following steps: \n
            1) Formulate and create goals. \n
            2) Describe and create comfortable daily schedule with periods of working and rest. \n
            3) Fill the gapes of the schedule with goals. \n
            Now you can refer to this schedule, print it, and check what's done of it.
            Happy achieving!
        `)
    })
}