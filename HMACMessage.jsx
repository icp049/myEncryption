const crypto = require('crypto');

const secretKey = 'mysecretkey';

const message = 'yo bruvs';

const senderHMAC = crypto.createHmac('sha256', secretKey).update(message).digest('hex');
console.log(senderHMAC);

const receivedMessage = message;
const receiverHMAC = crypto.createHmac('sha256', secretKey).update(receivedMessage).digest('hex');
console.log(receiverHMAC);

if(senderHMAC == receiverHMAC) {
    console.log("Message is encrypted");
} else {
    console.log("Message is vulnerable to attacks");
}