const {generateKeyPairSync} = require('crypto');

// this is a shared key
//private to public

const {privateKeym publicKey} = generateKeyPairSync('rsa', {
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




