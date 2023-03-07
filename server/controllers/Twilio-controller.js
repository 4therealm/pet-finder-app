
const express = require('express');
const dotenv = require('dotenv').config();

const twilio = require('twilio');


const accountSid = "AC58d7b408f9c5eeba6365df862153325c";
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = "50c808991ab98520de06fc0edef086a1";
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const from = process.env.TWILIO_PHONE_NUMBER;
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

