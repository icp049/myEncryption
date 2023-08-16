const crypto = require('crypto');

const receiverKeyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding : {type: 'spki', format: 'pem'},
    privateKeyEncoding: {type: 'pkcs8', format: 'pem'}
});

const senderPublicKey  = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMsYHhXEnfN2LKZz4dyGzpwnOu37mJW7
N23E2Uny4RdCkCeN9qAt9dcmE5NYzSvR0SZ9ZmNJn9+9THmYdZUaG9kCAwEAAQ==
-----END PUBLIC KEY-----`;

const myText = 'secret message is inside';

const encryptedData = crypto.publicEncrypt(senderPublicKey, Buffer.from(myText, 'utf8'));
console.log ('Encrypt:', encryptedData.toString('base64'));


const sign = crypto.createSign('RSA-SHA256');
sign.update(myText);
const signature = sign.sign(receiverKeyPair.privateKey, 'base64');
console.log('Signature: ', signature);
