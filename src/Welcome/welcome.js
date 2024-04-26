const welcomeMessage = "🤖Salam! Mən elchinimanov tərəfindən təkminləşdirilmiş Javascript öyrənmə botuyam! 🚀 Hər gün təyin etdiyiniz saatda  grupunuza Javascript ilə əlaqəli suallar yollayacam.\n\nKanalımıza qatılmaqı unutmayın! 🔥\n\nhttps://t.me/elchin_imanov";
const userGuideMessage = "1. Qrupa əlavə olunduqdan sonra, qrup söhbətində /startquiz əmrini yazın.\n2. Artıq hər gün təyin edilmiş saatda avtomatik olaraq yeni bir sual alacaqsınız.\n3. Sualları həll edin və JavaScript bacarıqlarınızı gücləndirin!"
const helpMessage = "Digər əmirləri /help yazaraq görə bilərsiniz."


const welcome = async (bot, chatID) => {
 await bot.sendMessage(chatID, welcomeMessage);
 await bot.sendMessage(chatID , userGuideMessage)
 await bot.sendMessage(chatID , helpMessage)
};

module.exports = welcome;
