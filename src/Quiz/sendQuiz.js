const questionsDB = require("../DataBase/question.js");
const group = require("../DataBase/group.js");

const sendQuiz = async (bot, chatID) => {
  const currentQuestion = selectQuestion();

  if (!currentQuestion) return;

  const questionText = currentQuestion.question;
  const answerOptions = currentQuestion.options;
  const quiestionCode = `
    \`\`\`javascript
   ${selectCode(currentQuestion.id)}
    \`\`\`
    `;

  try {
    await bot.sendMessage(chatID, quiestionCode, { parse_mode: "Markdown" });
    const _pollID = await bot.sendPoll(chatID, questionText, answerOptions, {
      is_anonymous: false,
    });

    
    currentQuestion.pollID = _pollID.poll.id;
    console.log(currentQuestion);
  } catch (error) {
    console.log("Error sending question to chat:", chatID, error);
  }
};

const selectQuestion = () => {
  for (let i = 0; i < questionsDB.length; i++) {
    if (!questionsDB[i].pollID) {
      return questionsDB[i];
    }
  }

  console.log("There are no questions left to post :(");
};

const selectCode = (codeID) => {
  const questionCode = questionsDB.find((element) => element.id === codeID);
  if (questionCode) {
    return questionCode.code;
  }
};

module.exports = sendQuiz;
