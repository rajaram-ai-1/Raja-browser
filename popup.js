// फाइल का नाम: popup.js
// काम: पॉपअप UI से सीधे ब्राउज़र इंजन को कमांड भेजना

console.log("🔱 Command Center Active");

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. एड-ब्लॉकर का रियल-टाइम डेटा लाना
    chrome.runtime.sendMessage({ action: "GET_SHIELD_STATUS" }, (response) => {
        if (response && response.shieldActive) {
            // हर बार जब पॉपअप खुलेगा, यह ब्लॉक किए गए विज्ञापनों की संख्या अपडेट करेगा
            // (अभी के लिए डमी डेटा, जिसे Worker.js से डायनामिक किया जा सकता है)
            document.getElementById('adsBlocked').innerText = response.blockedCount || "154";
        }
    });

    // 2. 🔥 डेटा बर्न बटन का लॉजिक
    document.getElementById('burnDataBtn').addEventListener('click', () => {
        const confirmBurn = confirm("🚨 क्या आप वाकई सारी हिस्ट्री और कुकीज़ जलाना चाहते हैं?");
        if (confirmBurn) {
            chrome.runtime.sendMessage({ action: "BURN_DATA" }, (res) => {
                document.getElementById('burnDataBtn').innerText = "✅ DATA BURNED";
                document.getElementById('burnDataBtn').style.background = "#00ff00";
                setTimeout(() => window.close(), 2000);
            });
        }
    });

    // 3. ✨ AI मोड खोलना (नए टैब में)
    document.getElementById('openAIBtn').addEventListener('click', () => {
        chrome.tabs.create({ url: "chrome://newtab" }); 
        window.close(); // पॉपअप बंद करें
    });
});
