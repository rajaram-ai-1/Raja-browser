// फाइल का नाम: script.js
// काम: UI को कंट्रोल करना, स्मार्ट सर्च, टैब ग्रुप्स और AI मोड को चलाना

console.log("🔱 Raja Browser Pro - Smart UI Engine Online!");

class RajaSmartUI {
    constructor() {
        this.searchBar = document.getElementById('centerUrlInput');
        this.displayArea = document.getElementById('displayArea');
        this.activeTab = 'home'; // डिफ़ॉल्ट टैब

        this.initEventListeners();
        this.loadSavedTheme();
    }

    // 1. ⚡ सभी बटन्स और कीबोर्ड शॉर्टकट्स को एक्टिवेट करना
    initEventListeners() {
        // सेंटर सर्च बार में 'Enter' दबाने पर
        if (this.searchBar) {
            this.searchBar.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    this.handleSmartSearch(this.searchBar.value);
                }
            });
        }

        // 'AI Mode' बटन के लिए
        const aiBtn = document.querySelector('.ai-mode-btn');
        if (aiBtn) {
            aiBtn.addEventListener('click', () => this.activateAIMode());
        }
    }

    // 2. 🧠 अल्ट्रा-स्मार्ट सर्च इंजन (URL vs Search Detection)
    handleSmartSearch(query) {
        let finalQuery = query.trim();
        if (!finalQuery) return;

        console.log(`[SEARCH] Processing query: ${finalQuery}`);

        // चेक करना कि यूजर ने वेबसाइट का नाम डाला है या कुछ सर्च किया है
        const isUrl = finalQuery.includes('.') && !finalQuery.includes(' ');
        
        if (isUrl) {
            // अगर URL है, तो 'https://' लगाकर सीधे वेबसाइट खोलें
            const url = finalQuery.startsWith('http') ? finalQuery : `https://${finalQuery}`;
            this.loadInFrame(url);
        } else {
            // अगर कोई सवाल है, तो उसे स्मार्ट तरीके से गूगल/बिंग पर सर्च करें
            // (यहाँ आप अपनी कमाई वाला Affiliate लिंक भी लगा सकते हैं)
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`;
            this.loadInFrame(searchUrl);
        }
    }

    // 3. 🖥️ बिना पेज रीलोड किए वेबसाइट लोड करना (Vivaldi Style Tab Management)
    loadInFrame(url) {
        console.log(`[TAB] Loading: ${url}`);
        
        // पुरानी स्क्रीन को छुपाना और वेबसाइट वाले फ्रेम को दिखाना
        let frame = document.getElementById('webFrame');
        if (!frame) {
            // अगर फ्रेम नहीं है, तो डायनामिक रूप से नया बना लें
            frame = document.createElement('iframe');
            frame.id = 'webFrame';
            frame.className = 'web-view';
            this.displayArea.appendChild(frame);
        }
        
        document.getElementById('homeScreen').style.display = 'none';
        frame.style.display = 'block';
        frame.src = url;
    }

    // 4. 🤖 AI Mode (आपका अपना विजन)
    activateAIMode() {
        console.log("🪄 [AI] Initializing Raja AI Mode...");
        const query = this.searchBar.value;
        
        if (query === "") {
            alert("🔱 AI Mode: कृपया सर्च बार में अपना सवाल लिखें, फिर AI बटन दबाएं!");
            return;
        }

        // यहाँ आपका अपना AI (Hugging Face / Streamlit) लोड होगा
        alert(`Raja AI आपके सवाल "${query}" का जवाब तैयार कर रहा है...`);
        // this.loadInFrame(`https://your-ai-app-link.com/?q=${query}`);
    }

    // 5. 🔥 डकडकगो (DuckDuckGo) डेटा बर्न को UI से ट्रिगर करना
    triggerDataBurn() {
        if (confirm("🚨 चेतावनी: क्या आप अपना सारा ब्राउज़िंग डेटा, कुकीज़ और हिस्ट्री जलाना चाहते हैं?")) {
            
            // Worker.js (बैकग्राउंड इंजन) को मैसेज भेजना
            chrome.runtime.sendMessage({ action: "BURN_DATA" }, (response) => {
                if (response && response.status === "Success") {
                    alert("💥 " + response.message);
                    window.location.reload(); // सब साफ होने के बाद पेज रिफ्रेश
                }
            });
        }
    }

    // 6. 🎨 डायनामिक ओपेरा (Opera GX) थीम कंट्रोल
    changeTheme(colorHex) {
        document.documentElement.style.setProperty('--neon-color', colorHex);
        localStorage.setItem('raja_theme', colorHex); // अगली बार के लिए सेव करना
        console.log(`[THEME] Color changed to ${colorHex}`);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('raja_theme');
        if (savedTheme) {
            document.documentElement.style.setProperty('--neon-color', savedTheme);
        }
    }
}

// जैसे ही पेज लोड हो, ब्राउज़र का दिमाग चालू कर दें
window.onload = () => {
    window.rajaUI = new RajaSmartUI();
};
