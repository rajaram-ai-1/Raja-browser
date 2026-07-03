const urlInput = document.getElementById('urlInput');
const centerUrlInput = document.getElementById('centerUrlInput');
const webFrame = document.getElementById('webFrame');
const homeScreen = document.getElementById('homeScreen');
const settingsScreen = document.getElementById('settingsScreen');
const notesScreen = document.getElementById('notesScreen');
const chromeMenu = document.getElementById('chromeMenu');

let searchCount = parseInt(localStorage.getItem('raja_search_count')) || 0;
if(document.getElementById('searchCountBadge')) document.getElementById('searchCountBadge').innerText = searchCount;

let savedTheme = localStorage.getItem('raja_theme') || '#ff4500';
document.documentElement.style.setProperty('--neon-color', savedTheme);

// 3-डॉट्स मेनू को खोलने/बंद करने का लॉजिक
function toggleMenu() {
    chromeMenu.style.display = chromeMenu.style.display === 'flex' ? 'none' : 'flex';
}

// जब बाहर क्लिक करें तो मेनू बंद हो जाए
document.addEventListener('click', function(event) {
    const isClickInside = document.querySelector('.menu-container').contains(event.target);
    if (!isClickInside) chromeMenu.style.display = 'none';
});

// सेंटर सर्च बार से खोजना
function handleCenterSearch() {
    let url = centerUrlInput.value.trim();
    if (!url) return;
    executeSearch(url);
}

// टॉप बार सर्च से खोजना
function handleSearch() {
    let url = urlInput.value.trim();
    if (!url) return;
    executeSearch(url);
}

// असली क्रोम और डकडकगो जैसा सर्च एक्जीक्यूशन
function executeSearch(url) {
    searchCount++;
    localStorage.setItem('raja_search_count', searchCount);
    if(document.getElementById('searchCountBadge')) document.getElementById('searchCountBadge').innerText = searchCount;

    let finalURL = '';
    if (!url.includes('.') || url.includes(' ')) {
        finalURL = `https://bing.com{encodeURIComponent(url)}`;
    } else {
        if (!url.startsWith('http')) finalURL = 'https://' + url;
        else finalURL = url;
    }
    
    // क्रोम की तरह अंदर ही लोड करना
    loadUrlInFrame(finalURL);
}

function loadUrlInFrame(url) {
    homeScreen.style.display = 'none';
    settingsScreen.style.display = 'none';
    notesScreen.style.display = 'none';
    chromeMenu.style.display = 'none';
    
    webFrame.style.display = 'block';
    webFrame.src = url;
    
    urlInput.style.display = 'block'; // टॉप यूआरएल बार दिखाएं
    urlInput.value = url;
    setActiveSidebarBtn(null);
}

function loadUrl(url, activeBtnId) {
    loadUrlInFrame(url);
    if(activeBtnId) setActiveSidebarBtn(document.getElementById(activeBtnId));
}

function goHome() {
    homeScreen.style.display = 'flex';
    settingsScreen.style.display = 'none';
    notesScreen.style.display = 'none';
    chromeMenu.style.display = 'none';
    webFrame.style.display = 'none';
    webFrame.src = '';
    urlInput.style.display = 'none'; // होम पर टॉप यूआरएल बार छुपाएं
    centerUrlInput.value = '';
    setActiveSidebarBtn(document.getElementById('homeBtn'));
}

function openSettings() {
    homeScreen.style.display = 'none';
    webFrame.style.display = 'none';
    notesScreen.style.display = 'none';
    chromeMenu.style.display = 'none';
    settingsScreen.style.display = 'flex';
    urlInput.style.display = 'block';
    urlInput.value = 'raja://settings-autofill';
    setActiveSidebarBtn(document.getElementById('lockBtn'));
    
    if(localStorage.getItem('auto_name')) {
        document.getElementById('autoName').value = localStorage.getItem('auto_name');
        document.getElementById('autoEmail').value = localStorage.getItem('auto_email');
        document.getElementById('autoPhone').value = localStorage.getItem('auto_phone');
    }
}

function openNotes() {
    homeScreen.style.display = 'none';
    webFrame.style.display = 'none';
    settingsScreen.style.display = 'none';
    chromeMenu.style.display = 'none';
    notesScreen.style.display = 'flex';
    urlInput.style.display = 'block';
    urlInput.value = 'raja://notes-pad';
    setActiveSidebarBtn(document.getElementById('notesBtn'));
    document.getElementById('notesArea').value = localStorage.getItem('raja_notes') || '';
}

function saveNotes() {
    localStorage.setItem('raja_notes', document.getElementById('notesArea').value);
}

function changeTheme(color) {
    document.documentElement.style.setProperty('--neon-color', color);
    localStorage.setItem('raja_theme', color);
}

function setActiveSidebarBtn(activeBtn) {
    document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
    if(activeBtn) activeBtn.classList.add('active');
}

function refreshPage() { if (webFrame.src) webFrame.src = webFrame.src; }

// रेफरल काउंटर
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
        document.querySelectorAll('.form-data-box input').forEach(input => input.disabled = false);
        const saveBtn = document.getElementById('saveFormBtn');
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.style.background = 'var(--neon-color)';
        }
    }
}

function saveFormData() {
    localStorage.setItem('auto_name', document.getElementById('autoName').value);
    localStorage.setItem('auto_email', document.getElementById('autoEmail').value);
    localStorage.setItem('auto_phone', document.getElementById('autoPhone').value);
    const msg = document.getElementById('saveMsg');
    if (msg) {
        msg.style.display = 'block';
        setTimeout(() => { msg.style.display = 'none'; }, 3000);
    }
}

// डकडकगो जैसा डेटा बर्न
function burnData() {
    if(confirm("क्या आप अपना पूरा डेटा, नोट्स और हिस्ट्री बर्न करना चाहते हैं?")) {
        localStorage.clear();
        searchCount = 0;
        invites = 0;
        alert("💥 सब कुछ पूरी तरह साफ कर दिया गया!");
        window.location.reload();
    }
}
