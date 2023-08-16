const {generateKeyPairSync} = require('crypto');
const crypto = reqyire('cypto');
// this is a shared key
//private to public

const {privateKey, publicKey} = generateKeyPairSync('rsa', {
modulusLength: 2048,
publicKeyEncoding :{
    type: 'spki',
    format: 'pem',
},
privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem', //privacy enhanced mail 
   // cipher: 'aes-256-cbc',
   // passphrase: 'secret message'
},

});

//generate the keys needed
console.log(publicKey);
console.log(privateKey); 


module.exports = {
    privateKey, publicKey
}

//lets see application here 

const originalMessage = 'Hello, my name is Ian Pedeglorio';

//encrypt using public key

const encryptedMessage = crypto.publicEncrypt(publicKey, Buffer.from(originalMessage, 'utf-8') );

//decrypt using private

const decryptedMessage = crypto.privateDecrypt(privateKey, encryptedMessage).toString('utf-8');

console.log('Original Message:  ', originalMessage);
console.log('Encrypted Message:  ', encryptedMessage.toString('base64'));
console.log('Decrypted Message:  ', decryptedMessage);




