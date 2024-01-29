const replacementsToEncrypt = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

const replacementsToDecrypt = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u'
};

const encryptText = (textToEncrypt) => {
    return textToEncrypt.replace(/a|e|i|o|u/g, (matched) => {
        return replacementsToEncrypt[matched];
    });
};
  
const decryptText = (encryptedText) => {
    return encryptedText.replace(/ai|enter|imes|ober|ufat/g, (matched) => {
        return replacementsToDecrypt[matched];
    });
};

export { encryptText, decryptText };