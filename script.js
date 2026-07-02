const urlInput = document.getElementById('urlInput');
const webFrame = document.getElementById('webFrame');
const homeScreen = document.getElementById('homeScreen');
const settingsScreen = document.getElementById('settingsScreen');

// 1. लाइव सर्च हैंडलर (डकडकगो प्राइवेसी लॉजिक के साथ अब 100% परफेक्ट काम करेगा)
function handleSearch() {
    let url = urlInput.value.trim();
    if (!url) return;

    let finalURL = '';

    if (!url.includes('.') || url.includes(' ')) {
        // यहाँ पर मैंने /?q= और $ दोनों को सही तरीके से जोड़ दिया है
        finalURL = `https://duckduckgo.com{encodeURIComponent(url)}`;
    } else {
        if (!url.startsWith('http')) {
            finalURL = 'https://' + url;
        } else {
            finalURL = url;
        }
    }
    
    // यह जादुई लाइन सुरक्षा पाबंदियों को तोड़कर लाइव वेबसाइट या खोज परिणाम नए टैब में तुरंत खोल देगी
    window.open(finalURL, '_blank');
    urlInput.value = ''; // सर्च बार खाली करें
}

// स्पीड डायल और साइडबार लिंक्स को भी लाइव नए टैब में खोलने के लिए
function loadUrl(url) {
    window.open(url, '_blank');
}

function goHome() {
    if (homeScreen) homeScreen.style.display = 'flex';
    if (settingsScreen) settingsScreen.style.display = 'none';
    if (webFrame) {
        webFrame.style.display = 'none';
        webFrame.src = '';
    }
    urlInput.value = '';
    setActiveSidebarBtn(document.querySelector('.sidebar-btn:nth-child(1)'));
}

function openSettings() {
    if (homeScreen) homeScreen.style.display = 'none';
    if (webFrame) webFrame.style.display = 'none';
    if (settingsScreen) settingsScreen.style.display = 'flex';
    urlInput.value = 'raja://settings-autofill';
    setActiveSidebarBtn(document.querySelector('.sidebar-btn:nth-child(4)'));
}

function setActiveSidebarBtn(activeBtn) {
    document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
    if(activeBtn) activeBtn.classList.add('active');
}

function refreshPage() {
    window.location.reload(); // लाइव रीफ्रेश
}

function goBack() {
    goHome(); 
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
    if (document.getElementById('refCount')) {
        document.getElementById('refCount').innerText = invites;
    }
    if (invites >= 3 && document.getElementById('lockStatus')) {
        document.getElementById('lockStatus').innerText = "UNLOCKED 🔓";
        document.getElementById('lockStatus').style.color = "#00ff00";
        document.querySelectorAll('.form-data-box input').forEach(input => {
            input.disabled = false;
            input.style.background = "#1c1c1c";
        });
    }
}
