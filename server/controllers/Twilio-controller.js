// const twilio = require('twilio');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

// function sendSMS(to, body) {
//   const client = twilio(accountSid, authToken);
//   return client.messages
//     .create({
//       body: body,
//       to: to,
//       from: twilioNumber,
//     })
//     .then((message) => {
//       console.log('Message SID:', message.sid);
//       return message.sid;
//     })
//     .catch((error) => {
//       console.error('Error sending SMS:', error);
//       throw error;
//     });
// }

// module.exports = { sendSMS };
const express = require('express');

const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;


module.exports =  {
async sendSMS(req, res){
  const { to, body } = req.body;
  const client = twilio(accountSid, authToken);
  client.messages
    .create({
      body: body,
      to: to,
      from: twilioNumber,
    })
    .then((message) => {
      console.log('Message SID:', message.sid);
      res.status(200).json({ message: 'SMS sent successfully', sid: message.sid });
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
      res.status(500).json({ message: 'Error sending SMS', error: error });
    });
}
}
