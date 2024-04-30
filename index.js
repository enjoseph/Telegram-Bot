const telegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");

//Module imports
const welcomeModule = require("./src/Welcome/welcome.js");
const setGroupModule = require("./src/sendQuiz/setGroup.js");
const isDaily = require("./src/sendQuiz/isDaily.js");
const checkAnswerModule = require("./src/sendQuiz/answerChecker.js");

const token = "6830036566:AAFuwdwCmmfuUChYIND9JP3NzWcYB1b0qIw";

const bot = new telegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatID = msg.chat.id;
  welcomeModule(bot, chatID);
  console.log('run started');
});

bot.onText(/\/quizstart (.+)/, (msg, match) => {
  const chat = msg.chat;
  const chatID = msg.chat.id;
  console.log("Run quiz start");
  setGroupModule(chat, match[1]); // butun idleri data base yazir
  isDaily(bot);
});

bot.on("poll_answer", (poll) => {
  const userOption = poll.option_ids;
  const user = poll.user;
  const pollID = poll.poll_id;

  checkAnswerModule(bot, userOption , user , pollID);
});

// bot.on ('polling_error' , (poll) => { console.log(poll)})


// cron.schedule("0 */1 * * *", () => isDaily(bot) ) // Her 30 saniyede bir (*/30)
