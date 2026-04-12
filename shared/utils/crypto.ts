export const encryptPayload = (data: any, key = 'NUXT_NEWS_SECRET') => {
  try {
    const textStr = typeof data === 'string' ? data : JSON.stringify(data);
    const encodedText = encodeURIComponent(textStr);
    let xorText = '';
    for (let i = 0; i < encodedText.length; i++) {
      xorText += String.fromCharCode(encodedText.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    if (typeof btoa !== 'undefined') {
      return btoa(xorText);
    }
    return Buffer.from(xorText, 'binary').toString('base64');
  } catch (e) {
    console.error('Encrypt error:', e);
    return null;
  }
};

export const decryptPayload = (ciphertext: any, key = 'NUXT_NEWS_SECRET') => {
  try {
    if (!ciphertext || typeof ciphertext !== 'string') return null;
    // Fix common Base64 issues caused by URL encoding/decoding
    const cleanCiphertext = ciphertext.replace(/ /g, '+').replace(/-/g, '+').replace(/_/g, '/');

    let xorText = '';
    if (typeof atob !== 'undefined') {
      xorText = atob(cleanCiphertext);
    } else {
      xorText = Buffer.from(cleanCiphertext, 'base64').toString('binary');
    }
    let decodedText = '';
    for (let i = 0; i < xorText.length; i++) {
      decodedText += String.fromCharCode(xorText.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }

    const decodedStr = decodeURIComponent(decodedText);
    try {
      return JSON.parse(decodedStr);
    } catch {
      return decodedStr;
    }
  } catch (e) {
    console.error('Decrypt error:', e);
    return null;
  }
};
