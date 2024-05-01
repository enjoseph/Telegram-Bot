const questionGroup = require("../DataBase/group.js");
const sendQuiz = require("./sendQuiz.js");

const Daily = (bot) => {
  console.log(questionGroup);
  console.log("Starting daily");
  const now = new Date();
  const hours = now.getHours();
  const daily = questionGroup.filter((item) => item.daily == hours);
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
