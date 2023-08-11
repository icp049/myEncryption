const crypto = require ('crypto');

const myText = "Hello, my name is Ian Pedeglorio";

const salt = crypto.randomBytes(16).toString('hex');

const saltedmyText = salt + myText;

const sha256Hash = crypto.createHash('sha256').update(saltedmyText).digest('hex');

console.log(salt);
console.log(saltedmyText);
console.log(sha256Hash);

