const questionsDB = require("../Question/questions.js");

const correctAnswerMSG = "Congratulations🎉, you answered correctly✅";
const wrongAnswerMSG =
  "Sorry, you gave the wrong answer. The correct answer was option A.";

const checkAnswer = (bot, userOption, user, pollID) => {
  const currentQuestion = questionsDB.find((question) => {
    return question.pollID == pollID;
  });

  isCorrectAnswer(bot, currentQuestion, userOption, user);
  isFalseAnswer(bot, currentQuestion, userOption, user)
};

const isCorrectAnswer = (bot, currentQuestion, userOption, user) => {
  const userID = user.id;
  const correctOption = currentQuestion.correctAnswerIndex;

  if (correctOption == userOption) {
    bot.sendMessage(userID, correctAnswerMSG);
  }
};

const isFalseAnswer = async (bot, currentQuestion, userOption, user) => {
  const userID = user.id;
  const correctOption = currentQuestion.correctAnswerIndex;
  const explanation = currentQuestion.explanation
  if (correctOption !== userOption) {
    await bot.sendMessage(userID,`❌ Sorry, you gave the wrong answer. The correct answer was option ${indexToOption(correctOption)}.`);
    await bot.sendMessage(userID, explanation)
  }
};

const indexToOption = (correctOption) => {
  const options = ["A", "B", "C", "D"];
  return options[correctOption];
};

module.exports = checkAnswer;
