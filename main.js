// ==========================================
// 🔱 RAJA BROWSER PRO - CONTENT ENGINE (main.js)
// Injected into every website to drive AI & Ads
// ==========================================

(function() {
    console.log("⚡ [Raja System] Content Engine Injected Successfully.");

    // 1. 🔱 तैरता हुआ राजा बटन स्क्रीन पर डालना (Floating Widget)
    function injectRajaWidget() {
        if (document.getElementById('raja-cyber-widget')) return;

        const widget = document.createElement('div');
        widget.id = 'raja-cyber-widget';
        widget.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            background: #050505;
            border: 2px solid #00ffcc;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 0 15px rgba(0, 255, 204, 0.6);
            font-size: 28px;
            user-select: none;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        `;
        widget.innerHTML = '🔱';

        //Hover Effects (हैकर्स लुक के लिए चमकना)
        widget.onmouseenter = () => {
            widget.style.transform = 'scale(1.15) rotate(10deg)';
            widget.style.boxShadow = '0 0 25px rgba(0, 255, 204, 1)';
        };
        widget.onmouseleave = () => {
            widget.style.transform = 'scale(1) rotate(0deg)';
            widget.style.boxShadow = '0 0 15px rgba(0, 255, 204, 0.6)';
        };

        widget.onclick = toggleCyberSidebar;
        document.body.appendChild(widget);
    }

    // 2. 🖥️ साईडबार खोलना (Cyber Terminal Sidebar)
    function toggleCyberSidebar() {
        let sidebar = document.getElementById('raja-cyber-sidebar');
        if (sidebar) {
            sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
            return;
        }

        sidebar = document.createElement('div');
        sidebar.id = 'raja-cyber-sidebar';
        sidebar.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            width: 340px;
            height: 100%;
            background: rgba(5, 5, 5, 0.96);
            border-left: 3px solid #ff003c;
            box-shadow: -10px 0 30px rgba(255, 0, 60, 0.3);
            z-index: 1000000;
            display: flex;
            flex-direction: column;
            padding: 20px;
            color: #00ffcc;
            font-family: 'Courier New', monospace;
        `;

        sidebar.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #ff003c; padding-bottom: 10px;">
                <span style="font-weight: bold; font-size: 18px; color: #fff; text-shadow: 0 0 10px #ff003c;">RAJA AI CO-PILOT</span>
                <span id="close-raja-sidebar" style="cursor: pointer; font-size: 22px; color: #ff003c; font-weight: bold;">✕</span>
            </div>

            <!-- 💸 ADSTERRA BANNER: इस बॉक्स में तुम्हारा एड चलेगा -->
            <div style="width: 100%; height: 80px; background: #111; border: 1px dashed #00ffcc; margin-bottom: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; font-size: 11px; overflow: hidden; padding: 5px;">
                <span style="color: #ff4500; font-weight: bold; letter-spacing: 1px;">⚡ SPONSORED LINK ⚡</span>
                <!-- यहाँ अपना Adsterra या अमेज़न बैनर कोड पेस्ट करें -->
                <a href="YOUR_AMAZON_AFFILIATE_LINK" target="_blank" style="color: #fff; text-decoration: underline; margin-top: 5px; font-size: 12px;">Grab Best Laptop Deals!</a>
            </div>

            <!-- चैट बॉक्स -->
            <div id="raja-chat-area" style="flex: 1; overflow-y: auto; background: rgba(0,0,0,0.6); padding: 12px; border-radius: 5px; border: 1px solid #333; margin-bottom: 15px; font-size: 13px; line-height: 1.4;">
                <p style="color: #666;">[Initializing Raja Secure Network...]</p>
                <p>🔱 <b>Raja AI:</b> स्वागत है राजाराम भाई के स्पेशल ब्राउज़र में! मुझसे कुछ भी पूछें या सिलेक्टेड टेक्स्ट को डिक्रिप्ट करें।</p>
            </div>

            <!-- इनपुट बॉक्स -->
            <div style="display: flex; gap: 5px;">
                <input type="text" id="raja-chat-input" placeholder="Ask anything..." style="flex: 1; background: #111; border: 1px solid #00ffcc; color: #fff; padding: 12px; outline: none; font-family: 'Courier New', monospace; font-size: 13px;">
                <button id="raja-chat-send" style="background: #00ffcc; color: #000; border: none; padding: 0 15px; cursor: pointer; font-weight: bold;">SEND</button>
            </div>
        `;

        document.body.appendChild(sidebar);

        // क्लोज बटन को चालू करना
        document.getElementById('close-raja-sidebar').onclick = () => {
            sidebar.style.display = 'none';
        };

        const input = document.getElementById('raja-chat-input');
        const sendBtn = document.getElementById('raja-chat-send');
        const chatArea = document.getElementById('raja-chat-area');

        // 🧠 स्मार्ट एआई रिस्पॉन्स + अर्निंग हुक
        function handleChat() {
            const text = input.value.trim();
            if (!text) return;

            chatArea.innerHTML += `<p style="color: #fff; margin-top: 8px;"><b>You:</b> ${text}</p>`;
            input.value = '';

            setTimeout(() => {
                let reply = "";
                let lowerText = text.toLowerCase();

                // अगर यूजर पढ़ाई या गैजेट्स से जुड़ा कुछ भी पूछता है, तो सीधे उसे अपने एफिलिएट लिंक पर भेजें!
                if (lowerText.includes('laptop') || lowerText.includes('computer') || lowerText.includes('pc')) {
                    reply = `🔥 <b>Raja Deal-Bot:</b> भाई, इस समय अमेज़न पर बेस्ट लैपटॉप्स पर भारी डिस्काउंट चल रहा है। अभी चेक करो:<br><br><a href="YOUR_AMAZON_LAPTOP_LINK" target="_blank" style="color: #ff003c; font-weight: bold; text-decoration: underline;">👉 बेस्ट लैपटॉप डील्स यहाँ देखें</a>`;
                } else if (lowerText.includes('book') || lowerText.includes('notes') || lowerText.includes('class 10')) {
                    reply = `📚 <b>Raja Study-Helper:</b> क्लास 10th की तैयारी के लिए सबसे बेस्ट बुक्स और गाइड्स यहाँ से लें, अच्छे मार्क्स की गारंटी:<br><br><a href="YOUR_AMAZON_BOOKS_LINK" target="_blank" style="color: #ff003c; font-weight: bold; text-decoration: underline;">👉 10th क्लास बेस्ट बुक्स लिंक</a>`;
                } else {
                    reply = `🔱 <b>Raja AI:</b> आपकी रिक्वेस्ट प्रोसेस हो गई है। इसके बारे में विस्तार से जानने के लिए <a href="https://www.google.com/search?q=${encodeURIComponent(text)}" target="_blank" style="color:#00ffcc; text-decoration: underline;">यहाँ गूगल पर देखें</a>।`;
                }

                chatArea.innerHTML += `<p style="margin-top: 8px; color: #00ffcc;">🔱 <b>Raja AI:</b> ${reply}</p>`;
                chatArea.scrollTop = chatArea.scrollHeight;
            }, 800);
        }

        sendBtn.onclick = handleChat;
        input.onkeydown = (e) => { if (e.key === 'Enter') handleChat(); };
    }

    // पेज लोड होने पर विजेट इन्जेक्ट करें
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        injectRajaWidget();
    } else {
        window.addEventListener('DOMContentLoaded', injectRajaWidget);
    }
})();
