const urlInput = document.getElementById('urlInput');
const webFrame = document.getElementById('webFrame');
const homeScreen = document.getElementById('homeScreen');
const settingsScreen = document.getElementById('settingsScreen');
const notesScreen = document.getElementById('notesScreen');

let searchCount = parseInt(localStorage.getItem('raja_search_count')) || 0;
document.getElementById('searchCountBadge').innerText = searchCount;

// डिफ़ॉल्ट थीम लोड करना
let savedTheme = localStorage.getItem('raja_theme') || '#ff4500';
document.documentElement.style.setProperty('--neon-color', savedTheme);

// 1. लाइव सर्च हैंडलर (अब यह क्रोम की तरह आपके ब्राउज़र के अंदर ही वेबसाइट खोलेगा)
function handleSearch() {
    let url = urlInput.value.trim();
    if (!url) return;

    searchCount++;
    localStorage.setItem('raja_search_count', searchCount);
    document.getElementById('searchCountBadge').innerText = searchCount;

    let finalURL = '';
    if (!url.includes('.') || url.includes(' ')) {
        // अगर कोई सवाल है, तो बिंग सर्च को अंदर लोड करें (क्योंकि बिंग अंदर लोड होना अलाउ करता है)
        finalURL = `https://bing.com{encodeURIComponent(url)}`;
    } else {
        if (!url.startsWith('http')) {
            finalURL = 'https://' + url;
        } else {
            finalURL = url;
        }
    }
    
    // यहाँ बदलाव किया है: यह क्रोम की तरह इसी स्क्रीन के अंदर फ्रेम में लोड होगा
    loadUrlInFrame(finalURL);
}

// वेबसाइट को फ्रेम के अंदर ही लोड करने का फंक्शन
function loadUrlInFrame(url) {
    homeScreen.style.display = 'none';
    settingsScreen.style.display = 'none';
    notesScreen.style.display = 'none';
    webFrame.style.display = 'block'; // फ्रेम को दिखाओ
    webFrame.src = url; // वेबसाइट को इसके अंदर लोड करो
    urlInput.value = url;
    setActiveSidebarBtn(null);
}

// साइडबार या स्पीड डायल लिंक्स को भी अंदर ही खोलने के लिए
function loadUrl(url, activeBtnId) {
    loadUrlInFrame(url);
    if(activeBtnId) setActiveSidebarBtn(document.getElementById(activeBtnId));
}

function goHome() {
    homeScreen.style.display = 'flex';
    settingsScreen.style.display = 'none';
    notesScreen.style.display = 'none';
    webFrame.style.display = 'none';
    webFrame.src = '';
    urlInput.value = '';
    setActiveSidebarBtn(document.getElementById('homeBtn'));
}

function openSettings() {
    homeScreen.style.display = 'none';
    webFrame.style.display = 'none';
    notesScreen.style.display = 'none';
    settingsScreen.style.display = 'flex';
    urlInput.value = 'raja://settings-autofill';
    setActiveSidebarBtn(document.getElementById('lockBtn'));
    
    if(localStorage.getItem('auto_name')) {
        document.getElementById('autoName').value = localStorage.getItem('auto_name');
        document.getElementById('autoEmail').value = localStorage.getItem('auto_email');
        document.getElementById('autoPhone').value = localStorage.getItem('auto_phone');
    }
}

// 2. त्वरित नोट्स पैड लॉजिक
function openNotes() {
    homeScreen.style.display = 'none';
    webFrame.style.display = 'none';
    settingsScreen.style.display = 'none';
    notesScreen.style.display = 'flex';
    urlInput.value = 'raja://notes-pad';
    setActiveSidebarBtn(document.getElementById('notesBtn'));
    document.getElementById('notesArea').value = localStorage.getItem('raja_notes') || '';
}

function saveNotes() {
    const text = document.getElementById('notesArea').value;
    localStorage.setItem('raja_notes', text);
}

// 3. थीम कस्टमाइज़र लॉजिक
function changeTheme(color) {
    document.documentElement.style.setProperty('--neon-color', color);
    localStorage.setItem('raja_theme', color);
}

function setActiveSidebarBtn(activeBtn) {
    document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
    if(activeBtn) activeBtn.classList.add('active');
}

function refreshPage() { 
    if (webFrame.src) webFrame.src = webFrame.src; 
}
function goBack() { goHome(); }

// 4. रेफरल काउंटर लॉजिक
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
    if (document.getElementById('refCount')) document.getElementById('refCount').innerText = invites;
    if (invites >= 3 && document.getElementById('lockStatus')) {
        document.getElementById('lockStatus').innerText = "UNLOCKED 🔓";
        document.getElementById('lockStatus').style.color = "#00ff00";
        document.querySelectorAll('.form-data-box input').forEach(input => {
            input.disabled = false;
        });
        const saveBtn = document.getElementById('saveFormBtn');
        saveBtn.disabled = false;
        saveBtn.style.background = 'var(--neon-color)';
    }
}

function saveFormData() {
    localStorage.setItem('auto_name', document.getElementById('autoName').value);
    localStorage.setItem('auto_email', document.getElementById('autoEmail').value);
    localStorage.setItem('auto_phone', document.getElementById('autoPhone').value);
    const msg = document.getElementById('saveMsg');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 3000);
}

// 5. डेटा बर्न
function burnData() {
    if(confirm("क्या आप अपना पूरा डेटा, नोट्स और हिस्ट्री बर्न करना चाहते हैं?")) {
        localStorage.clear();
        searchCount = 0;
        invites = 0;
        alert("💥 सब कुछ पूरी तरह साफ कर दिया गया!");
        window.location.reload();
    }
}
