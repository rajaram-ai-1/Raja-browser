// ==========================================
// 🔱 RAJA BROWSER PRO - HOME PAGE ENGINE (script.js)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("🔱 [Raja System] Home Page Engine (script.js) Online.");

    const centerUrlInput = document.getElementById("centerUrlInput");
    const aiModeBtn = document.getElementById("aiModeBtn");
    const burnDataBtn = document.getElementById("burnDataBtn");

    // 1. 🔍 स्मार्ट सर्च और यूआरएल रीडायरेक्टर (Smart Engine)
    function handleSearch() {
        let query = centerUrlInput.value.trim();
        if (!query) return;

        // अगर यूजर ने पूरा यूआरएल डाला है (जैसे: google.com या https://...)
        if (query.startsWith("http://") || query.startsWith("https://")) {
            window.location.href = query;
        } else if (query.includes(".") && !query.includes(" ")) {
            window.location.href = "https://" + query;
        } else {
            // साधारण सर्च को सीधे गूगल सर्च पर भेजें (इसे आप बाद में बदल भी सकते हैं)
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }

    // Enter बटन दबाने पर सर्च ट्रिगर करना
    centerUrlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    });

    // 2. ✨ राजा एआई असिस्टेंट (Simulated AI Engine)
    if (aiModeBtn) {
        aiModeBtn.addEventListener("click", () => {
            const query = centerUrlInput.value.trim();
            if (!query) {
                alert("🔱 Raja AI: पहले सर्च बॉक्स में अपना सवाल या कमांड टाइप करें!");
                centerUrlInput.focus();
                return;
            }

            // एक हैकर-स्टाइल प्रोम्प्ट अलर्ट जो यूजर को इम्प्रेस कर देगा
            alert(`⚡ [Raja AI Decrypting...]\n\nTARGET QUERY: "${query}"\n\n[Status]: राजा एआई आपके लिए डेटा तैयार कर रहा है...`);
            
            // यूजर को गूगल पर एआई समरी वाले पेज पर रीडायरेक्ट करना
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query + " in detail")}`;
        });
    }

    // 3. 🔥 डेटा बर्न बटन (Hardcore Privacy Destruction)
    if (burnDataBtn) {
        burnDataBtn.addEventListener("click", () => {
            const confirmBurn = confirm("⚠️ खतरनाक कदम: क्या आप ब्राउज़र की सारी हिस्ट्री, कुकीज़ और कैशे हमेशा के लिए नष्ट करना चाहते हैं?");
            
            if (confirmBurn) {
                // बटन पर एनीमेशन इफ़ेक्ट देना
                burnDataBtn.innerHTML = "🔥 BURNING...";
                burnDataBtn.style.background = "#ff0000";
                burnDataBtn.style.color = "#000";

                // Background Worker को डेटा डिलीट करने का सिग्नल भेजना
                chrome.runtime.sendMessage({ action: "BURN_DATA" }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Error:", chrome.runtime.lastError);
                        alert("❌ एरर: सिस्टम बैकग्राउंड इंजन से संपर्क टूट गया!");
                        resetBurnButton();
                        return;
                    }

                    if (response && response.status === "Success") {
                        // धमाका अलर्ट!
                        alert(`💥 BOOM!!!\n\n${response.message}\n\nसिस्टम अब पूरी तरह से सुरक्षित और साफ़ है।`);
                    } else {
                        alert("❌ डेटा डिलीट करने में कोई समस्या आई!");
                    }
                    resetBurnButton();
                });
            }
        });
    }

    // बटन को सामान्य स्थिति में लाना
    function resetBurnButton() {
        if (burnDataBtn) {
            burnDataBtn.innerHTML = '<span class="btn-icon">🔥</span> Burn Data';
            burnDataBtn.style.background = "";
            burnDataBtn.style.color = "";
        }
    }
});
