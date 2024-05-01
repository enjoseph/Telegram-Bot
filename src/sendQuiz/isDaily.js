const questionGroup = require("../DataBase/group.js");
const sendQuiz = require("./sendQuiz.js");

const Daily = (bot) => {
  console.log(questionGroup);
  console.log("Starting daily");
const userTimezoneOffset = (new Date()).getTimezoneOffset() / 60; // Saat cinsinden
const now = new Date();
const hours = new Date(now.getTime() + userTimezoneOffset * 60 * 60 * 1000);
  console.log(hours);
  const daily = questionGroup.filter((item) => item.daily == hours);
  console.log(daily);
  if (daily.length === 0) {
    console.log("No scheduled tasks for this hour.");
    return; // early return to exit the function
  }
  daily.forEach((item) => {
    console.log(`Sending quiz for group ${item.id}`);
    sendQuiz(bot, item.id);
  });
};

module.exports = Daily;
