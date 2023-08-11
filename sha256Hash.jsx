const crypto = require ('crypto');

const plainText = 'Hello, my name is Ian Pedeglorio';

const sha256Hash = crypto.createHash('sha256').update(plainText).digest('hex');
console.log(sha256Hash)

