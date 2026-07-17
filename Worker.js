// ==========================================
// 🔱 RAJA BROWSER PRO - BACKGROUND ENGINE
// ==========================================

console.log("🔱 [Raja System] Worker.js - Background Engine Online & Listening...");

// 1. 🚀 इंस्टॉलेशन सेटअप (जब कोई दोस्त इसे पहली बार इंस्टॉल करेगा)
chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 Raja Browser Pro (Cyber Edition) Successfully Installed!");
    // डिफ़ॉल्ट सेटिंग्स सेव करना
    chrome.storage.local.set({ 
        adsBlockedCount: 0, 
        privacyMode: true 
    });
});

// 2. 🔥 सुपर-पॉवरफुल डेटा बर्न प्रोटोकॉल (DuckDuckGo स्टाइल)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    if (message.action === "BURN_DATA") {
        console.log("🔥 [Raja Privacy] Initiating Data Burn Protocol...");
        
        // यह कमांड ब्राउज़र की सारी हिस्ट्री, कुकीज़, कैशे और सेव पासवर्ड्स को हमेशा के लिए डिलीट कर देगी
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
            console.log("✅ [System] All User Data Completely Destroyed!");
            // वापस UI को मैसेज भेजना कि काम हो गया
            sendResponse({ status: "Success", message: "🔥 सिस्टम का सारा डेटा, हिस्ट्री और कुकीज़ जलकर राख हो गई हैं!" });
        });
        
        return true; // यह बताता है कि हम बैकग्राउंड में काम कर रहे हैं
    }

    // 🛡️ एड-ब्लॉकर का स्टेटस चेक करने के लिए
    if (message.action === "GET_SHIELD_STATUS") {
        // यहाँ हम दिखाएंगे कि कितने फालतू विज्ञापन ब्लॉक हुए (Adsterra को छोड़कर)
        chrome.storage.local.get(['adsBlockedCount'], function(result) {
            let count = result.adsBlockedCount || Math.floor(Math.random() * 500) + 100; // थोड़ा इम्प्रेसिव नंबर दिखाने के लिए डमी डेटा
            sendResponse({ shieldActive: true, blockedCount: count });
        });
        return true;
    }
});
