const questionGroup = require("../DataBase/group.js");

const setGroup = (chat, _daily, callback) => {
  console.log('setGroup run');
  const chatType = chat.type;
  const chatID = chat.id;
  const group = { isSend: false, id: chatID, groupType: chatType, daily: _daily };

  const isGroupExists = questionGroup.some(item => item.id === group.id);

  if ((chatType === "group" || chatType === "supergroup") && isGroupExists === false) {
    questionGroup.push(group);
  }
  console.log(questionGroup);


  if (typeof callback === 'function') {
    callback();
  }
};

module.exports = setGroup;
