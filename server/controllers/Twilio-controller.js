
const express = require('express');
const dotenv = require('dotenv');

const twilio = require('twilio');


const accountSid = "AC58d7b408f9c5eeba6365df862153325c";
const authToken = "50c808991ab98520de06fc0edef086a1";
const from = "+18444711087";

module.exports =  {

async sendSMS(req, res){
  const { to, body } = req.body;
  const client = twilio(accountSid, authToken);
  client.messages
  .create({ body, from, to })
  
    .then((message) => {
  
      res.status(200).json({ message: 'SMS sent successfully', sid: message.sid });
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
      res.status(500).json({ message: 'Error sending SMS', error: error });
    });
}
}
// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
