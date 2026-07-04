// फाइल का नाम: main.js (Content Script)
// काम: हर वेबसाइट के अंदर घुसकर Raja Browser के फीचर्स लागू करना

console.log("🔱 [Raja Browser] main.js - Injected into " + window.location.hostname);

class RajaWebController {
    constructor() {
        this.aiButton = null;
        
        // वेबसाइट लोड होते ही फीचर्स चालू करें
        this.injectRajaAIAssistant();
        this.listenForCommands();
    }

    // 1. 🤖 हर वेबसाइट पर 'Raja AI' का जादुई बटन लगाना
    injectRajaAIAssistant() {
        // बटन बनाना
        this.aiButton = document.createElement('div');
        this.aiButton.id = 'raja-ai-float-btn';
        this.aiButton.innerHTML = '✨ Ask Raja AI';
        
        // बटन का स्टाइल (CSS सीधे JavaScript से)
        Object.assign(this.aiButton.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'linear-gradient(45deg, #ff4500, #ff0000)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '50px',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(255, 69, 0, 0.5)',
            cursor: 'pointer',
            zIndex: '999999', // सबसे ऊपर दिखेगा
            transition: 'all 0.3s ease'
        });

        // Hover Effect
        this.aiButton.onmouseover = () => this.aiButton.style.transform = 'scale(1.1)';
        this.aiButton.onmouseout = () => this.aiButton.style.transform = 'scale(1)';

        // क्लिक करने पर क्या होगा?
        this.aiButton.onclick = () => this.openMiniAI();

        // वेबसाइट की बॉडी में बटन को डालना
        document.body.appendChild(this.aiButton);
    }

    // AI का छोटा सा पॉपअप खोलना
    openMiniAI() {
        const selectedText = window.getSelection().toString();
        let prompt = "मैं आपकी कैसे मदद करूँ?";
        
        if (selectedText.length > 0) {
            prompt = `Raja AI, इस टेक्स्ट का मतलब समझाओ: "${selectedText}"`;
        }
        
        alert(`🔱 Raja AI Assistant\n\n${prompt}\n\n(यहाँ आपका असली AI चैटबॉक्स लोड होगा)`);
    }

    // 2. 🌙 फोर्स डार्क मोड (Force Dark Mode)
    enableDarkMode() {
        console.log("🌙 [Raja UI] Forcing Dark Mode...");
        const darkStyle = document.createElement('style');
        darkStyle.id = 'raja-dark-mode-style';
        darkStyle.innerHTML = `
            html, body {
                background-color: #121212 !important;
                color: #e0e0e0 !important;
            }
            a { color: #bb86fc !important; }
            div, p, span, h1, h2, h3, h4, h5, h6 {
                background-color: transparent !important;
                color: inherit !important;
            }
        `;
        document.head.appendChild(darkStyle);
    }

    // 3. 📖 एज ब्राउज़र जैसा रीडिंग मोड (Reader Mode)
    enableReaderMode() {
        console.log("📖 [Raja Reader] Activating Reader Mode...");
        // फालतू की चीजें (विजेट्स, साइडबार, फुटर) छुपाना
        const selectorsToHide = ['nav', 'footer', 'aside', '.sidebar', '.ads', '.comments'];
        selectorsToHide.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => el.style.display = 'none');
        });

        // मुख्य कंटेंट को बड़ा और साफ करना
        document.body.style.maxWidth = '800px';
        document.body.style.margin = '0 auto';
        document.body.style.padding = '40px';
        document.body.style.fontSize = '18px';
        document.body.style.lineHeight = '1.8';
        document.body.style.fontFamily = 'Georgia, serif';
    }

    // 4. ⚡ बैकग्राउंड (Worker.js) या पॉपअप (popup.js) से कमांड सुनना
    listenForCommands() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.command === "ACTIVATE_DARK_MODE") {
                this.enableDarkMode();
                sendResponse({ status: "Dark Mode Applied!" });
            }
            if (request.command === "ACTIVATE_READER_MODE") {
                this.enableReaderMode();
                sendResponse({ status: "Reader Mode Applied!" });
            }
        });
    }
}

// वेबसाइट के लोड होते ही कंट्रोलर को स्टार्ट कर देना
window.onload = () => {
    window.rajaWebController = new RajaWebController();
};
