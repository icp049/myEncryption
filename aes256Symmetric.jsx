const crypto = require('crypto');

const mySecretKey = crypto.randomBytes(32);

const myplainText = 'i need to encrypt this';

const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv('aes-256-cbc', mySecretKey, iv);

let encryptedData = cipher.update(myplainText, 'utf8', 'hex');
encryptedData += cipher.final('hex');

console.log(encryptedData);

console.log('if deciphered:')

const decipher = crypto.createDecipheriv('aes-256-cbc', mySecretKey, iv);

let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
decryptedData += decipher.final('utf-8');

console.log(decryptedData);