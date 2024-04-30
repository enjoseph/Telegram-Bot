const telegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");

//Module imports
const welcomeModule = require("./Welcome/welcome.js");
const setGroupModule = require("./sendQuiz/setGroup.js");
const isDaily = require("./sendQuiz/isDaily.js");
const checkAnswerModule = require("./sendQuiz/answerChecker.js");

const token = "6916722084:AAEPzKy4tac6sV11fd4Rs0VTI7DrahdIA3k";

const bot = new telegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatID = msg.chat.id;
  welcomeModule(bot, chatID);
  console.log('run started');
});

bot.onText(/\/quizstart (.+)/, (msg, match) => {
  const chat = msg.chat;
  const chatID = msg.chat.id;
  setGroupModule(chat, match[1]); // butun idleri data base yazir
  console.log("Run quiz start");
  isDaily(bot);
});

bot.on("poll_answer", (poll) => {
  const userOption = poll.option_ids;
  const user = poll.user;
  const pollID = poll.poll_id;

  checkAnswerModule(bot, userOption , user , pollID);
});

bot.on ('polling_error' , (poll) => { console.log(poll)})


cron.schedule("0 */1 * * *", () => isDaily(bot) ) // Her 30 saniyede bir (*/30)
