const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
    SESSION_ID: process.env.SESSION_ID || "QADEER-AI~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0hnODdMUVkraElDSVVjQmRXaWpQdGgrUjF0YTEyS0dwWTYrNGRjYitYMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSW8rZlJOZGViQmRGSzBHVTQ0QTk0a1pvWjhVeWp2ZGQ3NFVaaWN2Q0N3OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SEtRMjF2OTk2bndlMXR6SVNRWlVpUmUyYzNqVjZSYlQ3TFdpb2NuWUU0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXdzJLUEtocFY2STRiZks0UUdhSVFhWHdRN2V5NU1Vd1FpU1A3elovRFVFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdIUDNHVWQ1ellsd1BMTytyUGM0VzkyZ2dRcG5ibUxNclUrS3NZL0VmRXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iis5ZDVUWDZGZjh0Zkxsd0ZzUmVxSDJBSXJNdXBiOGwvdjIrTy92TFdlblE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV05ZcVRuSTdBZmlsREFUSzBOcUJLRGZjNWQ5bms5SzloMVJrcVdheFdrQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkFYL3hEOHJ6aFpFSnhITjh4aG5XRlk0L3MyQjNRRTJyaW1kWHZ6d2xsUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik00NHEzZ1p1VEdXNHYyUkk4MHB6NWM2WlQ5Z2xydFRFZ0ZIb0lxZ3BQWnM1RUJWWDIzSWoxd0FsV296eTFCQnB5ZlV2bXhTRmpDTUFFQkNUaE9zQ2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODAsImFkdlNlY3JldEtleSI6IllzRHR0OUk2THRzUUFmMXorVkhBVHhpWXBtQ1o4RzliTHNiVnVTaE4zRjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MjEzNzUxOTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUMxQ0QzRTMxODA3QTlGOUY2NEJCNzNBMUZCNjVBRDYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1OTYwNjU4NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MjEzNzUxOTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUMwQUJGMTYxQUQzQUQwQjY0RTUyOERCNjI1MjdFRjEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1OTYwNjU4NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MjEzNzUxOTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUMzQzMyNjA4OTI2RjYyMjJEOTdFQzdFMTM5NzZFM0IifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1OTYwNjU4N31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiNFhYODU2WUQiLCJtZSI6eyJpZCI6Ijk0NzIxMzc1MTkxOjEzQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTkwMDc4Nzc3Mjk4OTU0OjEzQGxpZCIsIm5hbWUiOiJYLk4uTy5SIDE5MSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjJCdzgwQ0VMUHVoY2NHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZEtHWHFWb28yUWgvSFB3R2c5bHVuWlRRWmd0TnhDTnRPeEMzSCtTcGlncz0iLCJhY2NvdW50U2lnbmF0dXJlIjoib1h0Umtoc3dqUHpRQWJQVVMwczdwbU5IajNOdUdTTm1GbW0zbitPTFBYNXloUTZqUlZrYUNOdzJhMlNvR2swQ0hNdnFML2t0dlE5bkxaSlhaelF3QVE9PSIsImRldmljZVNpZ25hdHVyZSI6InlOZ1lWeUo5QWdIbk01ZlYwY2VtRjh6Rk1HMWlSamRoaVNDMWVReXpiSmFzNyt3L05IRmxVcjZtRm9JS1A2ZmtncWVCaHlxMWVFTTRLRDZQQ3Rpc2p3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MjEzNzUxOTE6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWFNobDZsYUtOa0lmeHo4Qm9QWmJwMlUwR1lMVGNRamJUc1F0eC9rcVlvTCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU5NjA2NTgyLCJsYXN0UHJvcEhhc2giOiIzUjlaMzkiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5FLyJ9",  // Your bot's session ID (keep it secure)
    PREFIX: getConfig("PREFIX") || ".",  // Command prefix (e.g., "., / ! * - +")
    CHATBOT: getConfig("CHATBOT") || "on", // on/off chat bot 
    BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "QADEER-AI",  // Bot's display name
    MODE: getConfig("MODE") || process.env.MODE || "public",        // Bot mode: public/private/group/inbox
    REPO: process.env.REPO || "https://github.com/qadeermd/QADEER-AI",  // Bot's GitHub repo
    BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",  // Bot's BAILEYS

    // ===== OWNER & DEVELOPER SETTINGS =====
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94721375191",  // Owner's WhatsApp number
    OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "QADEER-AI",           // Owner's name
    DEV: process.env.DEV || "94721375191",                     // Developer's contact number
    DEVELOPER_NUMBER: '94721375191@s.whatsapp.net',            // Developer's WhatsApp ID

    // ===== AUTO-RESPONSE SETTINGS =====
    AUTO_REPLY: process.env.AUTO_REPLY || "false",              // Enable/disable auto-reply
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",// Reply to status updates?
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*QADEER AI VIEWED YOUR STATUS 🤖*",  // Status reply message
    READ_MESSAGE: process.env.READ_MESSAGE || "false",          // Mark messages as read automatically?
    REJECT_MSG: process.env.REJECT_MSG || "*📞 CALL NOT ALLOWED IN THIS NUMBER YOU DONT HAVE PERMISSION  📵*",
    // ===== REACTION & STICKER SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",              // Auto-react to messages?
    OWNER_REACT: process.env.OWNER_REACT || "false",              // Auto-react to messages?
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",          // Use custom emoji reactions?
    CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",  // set custom reacts
    STICKER_NAME: process.env.STICKER_NAME || "QADEER-AI",     // Sticker pack name
    AUTO_STICKER: process.env.AUTO_STICKER || "false",          // Auto-send stickers?
    // ===== MEDIA & AUTOMATION =====
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",      // Auto-record voice notes?
    AUTO_TYPING: process.env.AUTO_TYPING || "false",            // Show typing indicator?
    MENTION_REPLY: process.env.MENTION_REPLY || "false",   // reply on mentioned message 
    MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://files.catbox.moe/2ozgh8.jpg",  // Bot's "alive" menu mention image

    // ===== SECURITY & ANTI-FEATURES =====
    ANTI_DELETE: process.env.ANTI_DELETE || "true", // true antidelete to recover deleted messages 
    ANTI_CALL: process.env.ANTI_CALL || "false", // enble to reject calls automatically 
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",    // Block bad words?
    ANTI_LINK: process.env.ANTI_LINK || "true",    // Block links in groups
    ANTI_VV: process.env.ANTI_VV || "true",   // Block view-once messages
    DELETE_LINKS: process.env.DELETE_LINKS || "false",          // Auto-delete links?
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same", // inbox deleted messages (or 'same' to resend)
    ANTI_BOT: process.env.ANTI_BOT || "true",
    PM_BLOCKER: process.env.PM_BLOCKER || "true",

    // ===== BOT BEHAVIOR & APPEARANCE =====
    DESCRIPTION: process.env.DESCRIPTION || "*_© POWERED BY QADEER-AI*",  // Bot description
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",              // Allow public commands?
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",        // Show bot as always online?
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true", // React to status updates?
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true", // VIEW to status updates?
    AUTO_BIO: process.env.AUTO_BIO || "false", // ture to get auto bio 
    WELCOME: process.env.WELCOME || "false", // true to get welcome in groups 
    GOODBYE: process.env.GOODBYE || "false", // true to get goodbye in groups 
    ADMIN_ACTION: process.env.ADMIN_ACTION || "false", // true if want see admin activity 
};
        
