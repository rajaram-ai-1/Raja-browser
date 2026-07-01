// यह कोड Cloudflare Worker में डालना है
export default {
  async fetch(request) {
    const url = new URL(request.url);
    // अगर यूजर /google.com डाले तो उसे targetUrl बनाओ
    const target = url.pathname.substring(1) || url.searchParams.get("url");

    if (!target) {
      return new Response("राजा ब्राउज़र रेडी है! URL डालें, जैसे: /google.com", { status: 200 });
    }

    const targetUrl = target.startsWith("http") ? target : `https://${target}`;
    
    // वेबसाइट को फेच करो
    const response = await fetch(targetUrl, {
      headers: request.headers,
    });

    // रिस्पॉन्स को क्लीन करो (Ads और भारी स्क्रिप्ट हटाओ)
    let body = await response.text();
    body = body.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, ""); // स्क्रिप्ट हटा दी

    return new Response(body, {
      headers: { "Content-Type": "text/html" }
    });
  }
};
