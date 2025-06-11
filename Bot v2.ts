import { Bot, InlineKeyboard } from "grammy";
import dotenv from 'dotenv';

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN!);


const userFontSelection = new Map<number, string>();
let converter = false;


const cursive = [
    "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">",
    "?", "@", "𝒜", "ℬ", "𝒞", "𝒟", "ℰ", "ℱ", "𝒢", "ℋ", "ℐ", "𝒥", "𝒦", "ℒ", "ℳ",
    "𝒩", "𝒪", "𝒫", "𝒬", "ℛ", "𝒮", "𝒯", "𝒰", "𝒱", "𝒲", "𝒳", "𝒴", "𝒵", "[", "\\",
    "]", "^", "_", "`", "𝒶", "𝒷", "𝒸", "𝒹", "ℯ", "𝒻", "ℊ", "𝒽", "𝒾", "𝒿", "𝓀",
    "𝓁", "𝓂", "𝓃", "ℴ", "𝓅", "𝓆", "𝓇", "𝓈", "𝓉", "𝓊", "𝓋", "𝓌", "𝓍", "𝓎", "𝓏",
    "{", "|", "}"
];
const doubleLining = [
    "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
    "𝟘", "𝟙", "𝟚", "𝟛", "𝟜", "𝟝", "𝟞", "𝟟", "𝟠", "𝟡", ":", ";", "<", "=", ">",
    "?", "@", "𝔸", "𝔹", "ℂ", "𝔻", "𝔼", "𝔽", "𝔾", "ℍ", "𝕀", "𝕁", "𝕂", "𝕃", "𝕄",
    "ℕ", "𝕆", "ℙ", "ℚ", "ℝ", "𝕊", "𝕋", "𝕌", "𝕍", "𝕎", "𝕏", "𝕐", "ℤ", "[", "\\",
    "]", "^", "_", "`", "𝕒", "𝕓", "𝕔", "𝕕", "𝕖", "𝕗", "𝕘", "𝕙", "𝕚", "𝕛", "𝕜",
    "𝕝", "𝕞", "𝕟", "𝕠", "𝕡", "𝕢", "𝕣", "𝕤", "𝕥", "𝕦", "𝕧", "𝕨", "𝕩", "𝕪", "𝕫",
    "{", "|", "}"
];
const gothic = [
    "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">",
    "?", "@", "𝔄", "𝔅", "ℭ", "𝔇", "𝔈", "𝔉", "𝔊", "ℌ", "ℑ", "𝔍", "𝔎", "𝔏", "𝔐",
    "𝔑", "𝔒", "𝔓", "𝔔", "ℜ", "𝔖", "𝔗", "𝔘", "𝔙", "𝔚", "𝔛", "𝔜", "ℨ", "[", "\\",
    "]", "^", "_", "`", "𝔞", "𝔟", "𝔠", "𝔡", "𝔢", "𝔣", "𝔤", "𝔥", "𝔦", "𝔧", "𝔨",
    "𝔩", "𝔪", "𝔫", "𝔬", "𝔭", "𝔮", "𝔯", "𝔰", "𝔱", "𝔲", "𝔳", "𝔴", "𝔵", "𝔶", "𝔷",
    "{", "|", "}"
];
const circled = [
    "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
    "⓪", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", ":", ";", "<", "=", ">",
    "?", "@", "Ⓐ", "Ⓑ", "Ⓒ", "Ⓓ", "Ⓔ", "Ⓕ", "Ⓖ", "Ⓗ", "Ⓘ", "Ⓙ", "Ⓚ", "Ⓛ", "Ⓜ",
    "Ⓝ", "Ⓞ", "Ⓟ", "Ⓠ", "Ⓡ", "Ⓢ", "Ⓣ", "Ⓤ", "Ⓥ", "Ⓦ", "Ⓧ", "Ⓨ", "Ⓩ", "[", "\\",
    "]", "^", "_", "`", "ⓐ", "ⓑ", "ⓒ", "ⓓ", "ⓔ", "ⓕ", "ⓖ", "ⓗ", "ⓘ", "ⓙ", "ⓚ",
    "ⓛ", "ⓜ", "ⓝ", "ⓞ", "ⓟ", "ⓠ", "ⓡ", "ⓢ", "ⓣ", "ⓤ", "ⓥ", "ⓦ", "ⓧ", "ⓨ", "ⓩ",
    "{", "|", "}"
];
const squared = [
    "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", "⊡", "/",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">",
    "?", "@", "🄰", "🄱", "🄲", "🄳", "🄴", "🄵", "🄶", "🄷", "🄸", "🄹", "🄺", "🄻",
    "🄼", "🄽", "🄾", "🄿", "🅀", "🅁", "🅂", "🅃", "🅄", "🅅", "🅆", "🅇", "🅈", "🅉",
    "[", "\\", "]", "^", "_", "`", "🄰", "🄱", "🄲", "🄳", "🄴", "🄵", "🄶", "🄷",
    "🄸", "🄹", "🄺", "🄻", "🄼", "🄽", "🄾", "🄿", "🅀", "🅁", "🅂", "🅃", "🅄",
    "🅅", "🅆", "🅇", "🅈", "🅉", "{", "|", "}"
];
const smallCaps = [
    "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "[", "\\", "]", "^", "_", "`",
    "ᴀ", "ʙ", "ᴄ", "ᴅ", "ᴇ", "ꜰ", "ɢ", "ʜ", "ɪ", "ᴊ", "ᴋ", "ʟ", "ᴍ", "ɴ", "ᴏ", "ᴘ",
    "q", "ʀ", "ꜱ", "ᴛ", "ᴜ", "ᴠ", "ᴡ", "x", "ʏ", "ᴢ",
    "{", "|", "}"
];
const fullWidth = [
    "！", "゛", "＃", "＄", "％", "＆", "'", "（", "）", "＊", "＋", "、", "ー", "。", "／",
    "０", "１", "２", "３", "４", "５", "６", "７", "８", "９", "：", "；", "〈", "＝", "〉", "？", "＠",
    "Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ", "Ｊ", "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", "Ｐ",
    "Ｑ", "Ｒ", "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ",
    "［", "\\", "］", "＾", "＿", "‘",
    "ａ", "ｂ", "ｃ", "ｄ", "ｅ", "ｆ", "ｇ", "ｈ", "ｉ", "ｊ", "ｋ", "ｌ", "ｍ", "ｎ", "ｏ", "ｐ",
    "ｑ", "ｒ", "ｓ", "ｔ", "ｕ", "ｖ", "ｗ", "ｘ", "ｙ", "ｚ",
    "｛", "｜", "｝"
];
const emojiRegional = [
    "❗", "\\", "❝", "#", "$", "%", "&", "❜", "(", ")", "*", "+", ",", "-", ".", "/",
    "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣",
    "⦂", "⨾", "<", "=", ">", "?", "@",
    "🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴",
    "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿",
    "[", "\\", "]", "^", "_", "`",
    "🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴",
    "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿",
    "{", "|", "}"
];
const distortedStyle = [
    "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
    "0", "߁", "2", "3", "4", "5", "6", "7", "8", "9",
    ":", ";", "<", "=", ">", "⸮", "@",
    "A", "d", "Ↄ", "b", "Ǝ", "ꟻ", "G", "H", "I", "J", "K", "⅃", "M", "ᴎ", "O", "ꟼ", "p", "ᴙ", "Ꙅ", "T", "U", "V", "W", "X", "Y", "Z",
    "[", "\\", "]", "^", "_", "`",
    "A", "d", "ↄ", "b", "ɘ", "ꟻ", "g", "H", "i", "j", "k", "l", "m", "ᴎ", "o", "q", "p", "ᴙ", "ꙅ", "T", "U", "v", "w", "x", "Y", "z",
    "{", "|", "}"
];
const alienStyle = [
    "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
    "⊘", "𝟙", "ϩ", "Ӡ", "५", "Ƽ", "Ϭ", "7", "𝟠", "९",
    ":", ";", "<", "=", ">", "?", "@",
    "Ⱥ", "β", "↻", "Ꭰ", "Ɛ", "Ƒ", "Ɠ", "Ƕ", "į", "ل", "Ҡ", "Ꝉ", "Ɱ", "ហ", "ට", "φ", "Ҩ", "འ", "Ϛ", "Ͳ", "Ա", "Ỽ", "చ", "ჯ", "Ӌ", "ɀ",
    "[", "\\", "]", "^", "_", "`",
    "ą", "ҍ", "ç", "ժ", "ҽ", "ƒ", "ց", "հ", "ì", "ʝ", "ҟ", "Ӏ", "ʍ", "ղ", "օ", "ք", "զ", "ɾ", "ʂ", "է", "մ", "ѵ", "ա", "×", "վ", "Հ",
    "{", "|", "}"
];

const firstMenu = `Welcome to Unicode Font Bot! 🌟 Transform your regular text into stylish Unicode fonts with just a tap! ✨ Send any text, and we\'ll convert it into cool, fancy, and eye-catching fonts — perfect for social media, bios, and messages.`;
const secondMenu = `Now use the buttons below to choose your font`;
const convertMenu = `<b>How to Use</b>
- Send any text – Just type and send a message.
- Choose a font – The bot will reply with your text in multiple Unicode font styles.
- Copy & Paste – Tap and copy your favorite style to use it anywhere!`;
const helpMenu = `Welcome! This bot helps you convert plain text into a variety of stylish Unicode fonts that you can copy and use anywhere — on Instagram, Twitter, WhatsApp, or wherever you want to stand out!

🔹 <b>How to Use</b>
- Send any text – Just type and send a message.
- Choose a font – The bot will reply with your text in multiple Unicode font styles.
- Copy & Paste – Tap and copy your favorite style to use it anywhere!`;

// === Buttons ===
const convertButton = "Convert";
const backButton = "Back";
const helpButton = "Help";

const styleButtons = [
    "cursive", "double lining", "gothic", "circled", "squared",
    "small caps", "full width", "​emoji regional", "distorted", "alien style"
];

const firstMenuMarkup = new InlineKeyboard()
    .text(convertButton, convertButton)
    .text(helpButton, helpButton);

const secondMenuMarkup = new InlineKeyboard()
    .text("cursive", "cursive")
    .text("double lining", "double lining")
    .text("gothic", "gothic")
    .row()
    .text("circled", "circled")
    .text("squared", "squared")
    .text("small caps", "small caps")
    .row()
    .text("full width", "full width")
    .text("​emoji regional", "​emoji regional")
    .text("distorted", "distorted")
    .row()
    .text("alien style", "alien style")
    .row()
    .text(backButton, backButton)
    .text(helpButton, helpButton);

const helpMenuMarkup = new InlineKeyboard().text(backButton, backButton);
const convertMenuMarkup = new InlineKeyboard().text(backButton, backButton);

// === Command Handlers ===
bot.command("start", async (ctx) => {
    await ctx.reply(firstMenu, {
        parse_mode: "HTML",
        reply_markup: firstMenuMarkup,
    });
});

bot.command("help", async (ctx) => {
    await ctx.reply(helpMenu, {
        parse_mode: "HTML",
        reply_markup: helpMenuMarkup,
    });
});

bot.command("convert", async (ctx) => {
    converter = true;
    await ctx.reply(secondMenu, {
        parse_mode: "HTML",
        reply_markup: secondMenuMarkup,
    });
});

bot.callbackQuery(helpButton, async (ctx) => {
    await ctx.editMessageText(helpMenu, {
        parse_mode: "HTML",
        reply_markup: helpMenuMarkup
    });
});

bot.callbackQuery(convertButton, async (ctx) => {
    converter = true;
    await ctx.editMessageText(secondMenu, {
        parse_mode: "HTML",
        reply_markup: secondMenuMarkup,
    });
});

bot.callbackQuery(backButton, async (ctx) => {
    converter = false;
    userFontSelection.delete(ctx.from.id);
    await ctx.editMessageText(firstMenu, {
        parse_mode: "HTML",
        reply_markup: firstMenuMarkup
    });
});

styleButtons.forEach(style => {
    bot.callbackQuery(style, async (ctx) => {
        userFontSelection.set(ctx.from.id, style);
        await ctx.editMessageText(convertMenu, {
            parse_mode: "HTML",
            reply_markup: convertMenuMarkup
        });
    });
});

// === Message Handler ===
bot.on("message", async (ctx) => {
    if (!ctx.message.text) return;
    if (!converter) return;

    const text = ctx.message.text;
    const userStyle = userFontSelection.get(ctx.from.id);

    if (!userStyle) {
        await ctx.reply("Please select a font style first and then Convert.");
        return;
    }

    const fontArray = getFontArray(userStyle);
    if (!fontArray) {
        await ctx.reply("Invalid font selection.");
        return;
    }

    const result = convertTextToStyle(text, fontArray);
    await ctx.reply(result, {
        parse_mode: "HTML",
    });
});

function getFontArray(style: string): string[] | undefined {
    switch (style) {
        case "cursive": return cursive;
        case "double lining": return doubleLining;
        case "gothic": return gothic;
        case "circled": return circled;
        case "squared": return squared;
        case "small caps": return smallCaps;
        case "full width": return fullWidth;
        case "​emoji regional": return emojiRegional;
        case "distorted": return distortedStyle;
        case "alien style": return alienStyle;
        default: return undefined;
    }
}

function convertTextToStyle(text: string, fontArray: string[]): string {
    const base = "!".charCodeAt(0);
    return text.split('').map(char => {
        if (char === " ") return " ";
        const index = char.charCodeAt(0) - base;
        return fontArray[index] || char;
    }).join('');
}

bot.start();
