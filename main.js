// RAJA BROWSER: AUTO-FILL ENGINE
const RajaAutoFill = {
    // यूजर का डेटा (इसे भविष्य में हम ब्राउज़र की 'Chrome Storage' में सुरक्षित रखेंगे)
    userData: {
        name: "राजेश कुमार", // उदाहरण
        fatherName: "सुरेश कुमार",
        email: "rajaram@example.com"
    },

    fillForms: () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            // नाम वाला बॉक्स ढूंढो
            if (input.name.toLowerCase().includes('name')) {
                input.value = RajaAutoFill.userData.name;
            }
            // ईमेल वाला बॉक्स ढूंढो
            if (input.type === 'email') {
                input.value = RajaAutoFill.userData.email;
            }
        });
        alert("🔱 राजा ब्राउज़र: डेटा सफलतापूर्वक भर दिया गया है!");
    }
};

// कमांड सुनने के लिए
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "fill_form") RajaAutoFill.fillForms();
});
