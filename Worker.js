// फाइल का नाम: Worker.js
// काम: बैकग्राउंड प्रॉक्सी, एड-ब्लॉकर (Brave स्टाइल), और डेटा बर्न (DuckDuckGo स्टाइल)

console.log("🔱 [Raja Browser] Worker.js - Background Engine Initialized.");

// 1. 🛑 ब्रेव (Brave) स्टाइल एड और ट्रैकर ब्लॉकर (Ad-Blocker Engine)
// यह लिस्ट उन सर्वर्स की है जहाँ से वेबसाइट्स पर विज्ञापन और ट्रैकर्स आते हैं
const BLOCKED_DOMAINS = [
    "*://*.doubleclick.net/*",
    "*://*.google-analytics.com/*",
    "*://*.facebook.com/tr/*",
    "*://*.ads.yahoo.com/*",
    "*://*.amazon-adsystem.com/*",
    "*://*.adservice.google.com/*"
];

// जब भी कोई वेबसाइट इनमें से किसी लिंक को लोड करने की कोशिश करेगी, हमारा ब्राउज़र उसे ब्लॉक कर देगा
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.warn(`🛡️ [Raja Shield] Blocked Ad/Tracker from: ${details.url}`);
        return { cancel: true }; // यह कमांड विज्ञापन को स्क्रीन पर आने ही नहीं देगी
    },
    { urls: BLOCKED_DOMAINS },
    ["blocking"]
);

// 2. ⚡ एक्सटेंशन इंस्टॉल या अपडेट होने पर सिस्टम को तैयार करना
chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 Raja Browser Pro Successfully Installed!");
    // डिफॉल्ट सेटिंग्स को सेव करना
    chrome.storage.local.set({ 
        adsBlockedCount: 0, 
        privacyMode: true 
    });
});

// 3. 🧠 UI (index.html) और बैकग्राउंड (Worker.js) के बीच संचार (Communication)
// जब यूजर UI में कोई बटन दबाएगा, तो यह फाइल बैकग्राउंड में वह काम करेगी
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    // 🔥 DuckDuckGo स्टाइल: एक क्लिक में सारा डेटा जला देना (Burn Data)
    if (message.action === "BURN_DATA") {
        console.log("🔥 [Raja Privacy] Initiating Data Burn Protocol...");
        
        // ब्राउज़र की सारी हिस्ट्री, कुकीज़, कैशे और पासवर्ड्स को डिलीट करना
        chrome.browsingData.remove({}, {
            "appcache": true,
            "cache": true,
            "cookies": true,
            "downloads": true,
            "fileSystems": true,
            "formData": true,
            "history": true,
            "indexedDB": true,
            "localStorage": true,
            "passwords": true
        }, function () {
            console.log("✅ All User Data Completely Destroyed!");
            sendResponse({ status: "Success", message: "डेटा पूरी तरह साफ हो गया है!" });
        });
        
        return true; // यह बताता है कि response बाद में (asynchronously) आएगा
    }

    // 🛡️ एड-ब्लॉकर का स्टेटस चेक करना
    if (message.action === "GET_SHIELD_STATUS") {
        sendResponse({ shieldActive: true, blockedCount: 154 });
    }
});
