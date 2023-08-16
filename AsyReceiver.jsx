const crypto = require('crypto');

// Sender's key pair
const senderKeyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding : {type: 'spki', format: 'pem'},
    privateKeyEncoding: {type: 'pkcs8', format: 'pem'}
});

const receiverPublicKey  = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMsYHhXEnfN2LKZz4dyGzpwnOu37mJW7
N23E2Uny4RdCkCeN9qAt9dcmE5NYzSvR0SZ9ZmNJn9+9THmYdZUaG9kCAwEAAQ==
-----END PUBLIC KEY-----`;

const myText = 'secret message is inside';

// Generate a random symmetric key for AES encryption
const symmetricKey = crypto.randomBytes(32); // 32 bytes for AES-256

// Encrypt the symmetric key using the recipient's public key
const encryptedSymmetricKey = crypto.publicEncrypt(
    { key: receiverPublicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
    symmetricKey
);

// Encrypt the message using the symmetric key
const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, crypto.randomBytes(16)); // 16 bytes for IV
let encryptedMessage = cipher.update(myText, 'utf8', 'base64');
encryptedMessage += cipher.final('base64');

console.log('Encrypted Message:', encryptedMessage);
console.log('Encrypted Symmetric Key:', encryptedSymmetricKey.toString('base64'));

// Sign the encrypted message using the sender's private key
const sign = crypto.createSign('RSA-SHA256');
sign.update(encryptedMessage);
const signature = sign.sign(senderKeyPair.privateKey, 'base64');
console.log('Signature:', signature);

//data too large