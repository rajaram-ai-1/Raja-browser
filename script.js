const urlInput = document.getElementById('urlInput');
const webFrame = document.getElementById('webFrame');
const homeScreen = document.getElementById('homeScreen');
const settingsScreen = document.getElementById('settingsScreen');

// 1. सर्च हैंडलर (डकडकगो प्राइवेसी लॉजिक के साथ)
function handleSearch() {
    let url = urlInput.value.trim();
    if (!url) return;

    if (!url.includes('.') || url.includes(' ')) {
        // अगर यूआरएल नहीं है, तो डकडकगो प्राइवेसी सर्च इंजन पर भेजें
        url = `https://duckduckgo.com{encodeURIComponent(url)}`;
    } else if (!url.startsWith('http')) {
        url = 'https://' + url;
    }
    
    loadUrl(url);
}

function loadUrl(url) {
    homeScreen.style.display = 'none';
    settingsScreen.style.display = 'none';
    webFrame.style.display = 'block';
    webFrame.src = url;
    urlInput.value = url;
    setActiveSidebarBtn(null);
}

function goHome() {
    homeScreen.style.display = 'flex';
    settingsScreen.style.display = 'none';
    webFrame.style.display = 'none';
    webFrame.src = '';
    urlInput.value = '';
    setActiveSidebarBtn(document.querySelector('.sidebar-btn:nth-child(1)'));
}

function openSettings() {
    homeScreen.style.display = 'none';
    webFrame.style.display = 'none';
    settingsScreen.style.display = 'flex';
    urlInput.value = 'raja://settings-autofill';
    setActiveSidebarBtn(document.querySelector('.sidebar-btn:nth-child(4)'));
}

function setActiveSidebarBtn(activeBtn) {
    document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
    if(activeBtn) activeBtn.classList.add('active');
}

function refreshPage() {
    if (webFrame.src) webFrame.src = webFrame.src;
}

function goBack() {
    goHome(); // टेम्पररी वेब प्रोटोटाइप के लिए होम पर वापस भेजें
}

// 2. रेफरल लूप लॉजिक (Local Storage Tracker)
let invites = parseInt(localStorage.getItem('raja_invites')) || 0;
updateReferralUI();

function simulateReferral() {
    if (invites < 3) {
        invites++;
        localStorage.setItem('raja_invites', invites);
        updateReferralUI();
    }
}

function updateReferralUI() {
    document.getElementById('refCount').innerText = invites;
    if (invites >= 3) {
        document.getElementById('lockStatus').innerText = "UNLOCKED 🔓";
        document.getElementById('lockStatus').style.color = "#00ff00";
        // फॉर्म के इनपुट बॉक्स को इनेबल कर देना
        document.querySelectorAll('.form-data-box input').forEach(input => {
            input.disabled = false;
            input.style.background = "#1c1c1c";
        });
    }
}
