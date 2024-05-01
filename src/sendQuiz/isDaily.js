const group = require("../DataBase/group.js");
const sendQuiz = require("./sendQuiz.js");

const Daily = (bot) => {
  console.log("Starting daily")
  const now = new Date();
  const hours = now.getHours();
  const daily = group.filter((item) => item.daily == hours);
  daily.forEach((item) => {
  console.log(item);
    sendQuiz(bot, item.id);
  });
};

module.exports = Daily;
