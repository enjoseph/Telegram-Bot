const moment = require("moment-timezone");

const questionGroup = require("../DataBase/group.js");
const sendQuiz = require("./sendQuiz.js");

const Daily = (bot) => {
  console.log(questionGroup);
  console.log("Starting daily");
  const hours = moment.tz("Asia/Baku").format("H");

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
