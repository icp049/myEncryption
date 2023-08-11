const crypto = require('crypto');

const {publicKey, privateKey} = crypto. generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {type: 'spki', format: 'pem'},
    privateKeyEncoding: {type: 'pkcs8', format: 'pem'}
 });

 const message = "verify this message plsssss";

 const sign = crypto.createSign('RSA-SHA256');
 sign.update(message);
 const signature = sign.sign(privateKey,'base64');

 console.log('Signature is: ' , signature);

 const verify = crypto.createVerify('RSA-SHA256');
 verify.update(message);
 const isVerified = verify.verify(publicKey, signature, 'base64');

 console.log('verification');
 console.log(isVerified);