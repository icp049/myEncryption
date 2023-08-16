const {generateKeyPairSync} = require('crypto');

// this is a shared key
//private to public

const {privateKeym publicKey} = generateKeyPairSync('rsa', {
modulusLength: 2048,
publicKeyEncoding :{
    type: 'spki',
},
privateKeyEncoding: {
    type: 'pkcs8',
},

});



