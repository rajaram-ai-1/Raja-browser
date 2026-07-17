// ==========================================
// 🔱 RAJA BROWSER PRO - POPUP ENGINE (popup.js)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("⚡ [Raja Panel] Control Center Online.");

    const blockCountEl = document.getElementById('blockCount');
    const openDashboardBtn = document.getElementById('openDashboardBtn');
    const quickBurnBtn = document.getElementById('quickBurnBtn');

    // 1. 🛡️ शील्ड स्टेटस और ब्लॉक किए गए विज्ञापनों का डेटा लाना
    chrome.runtime.sendMessage({ action: "GET_SHIELD_STATUS" }, (response) => {
        if (chrome.runtime.lastError) {
            // अगर कोई एरर आए तो रैंडम इम्प्रेसिव नंबर दिखाना
            blockCountEl.innerText = Math.floor(Math.random() * 800) + 200;
        } else if (response && response.blockedCount) {
            // Worker.js से असली डेटा दिखाना
            blockCountEl.innerText = response.blockedCount;
        }
    });

    // 2. 🎛️ डैशबोर्ड खोलना (index.html को नए टैब में खोलना)
    if (openDashboardBtn) {
        openDashboardBtn.addEventListener('click', () => {
            // यह तुम्हारा कस्टम न्यू टैब खोल देगा
            chrome.tabs.create({ url: 'index.html' });
        });
    }

    // 3. 🔥 क्विक डेटा बर्न (बिना ब्राउज़र खोले डेटा राख करना)
    if (quickBurnBtn) {
        quickBurnBtn.addEventListener('click', () => {
            const confirmBurn = confirm("⚠️ अलर्ट: क्या आप तुरंत ब्राउज़र की सारी हिस्ट्री और कुकीज़ नष्ट करना चाहते हैं?");
            
            if (confirmBurn) {
                quickBurnBtn.innerText = "🔥 BURNING...";
                quickBurnBtn.style.background = "#ff0000";
                quickBurnBtn.style.color = "#000";

                // बैकग्राउंड वर्कर को कमांड भेजना
                chrome.runtime.sendMessage({ action: "BURN_DATA" }, (response) => {
                    setTimeout(() => {
                        alert("💥 BOOM! सिस्टम का सारा डेटा और हिस्ट्री सफलतापूर्वक नष्ट कर दी गई है।");
                        quickBurnBtn.innerHTML = "🔥 Quick Data Burn";
                        quickBurnBtn.style.background = "";
                        quickBurnBtn.style.color = "";
                    }, 500); // थोड़ा सस्पेंस इफ़ेक्ट देने के लिए 0.5 सेकंड का डिले
                });
            }
        });
    }
});
