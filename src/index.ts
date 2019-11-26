import dontenv = require("dotenv");

import AppServer from "./server/app";
import TelegramBot from "./bot/index";

dontenv.config();

const port: string | undefined = process.env.PORT;
const tgBotToken: string | undefined = process.env.TELEGRAM_BOT_TOKEN;

const APIServer = new AppServer();
const telegramBot = new TelegramBot(tgBotToken);

telegramBot.launch(() => {
  console.log(`Telegram bot launched...`);
});

APIServer.app.listen(port, () => {
  console.log(`listening at port ${port}...`);
});
