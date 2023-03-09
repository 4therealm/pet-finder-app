const express = require("express");
require("dotenv").config();

const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER;

module.exports = {
  async sendSMS(req, res) {
    const { to, body } = req.body;
    const client = twilio(accountSid, authToken);
    client.messages
      .create({ body, from, to })

      .then((message) => {
        res
          .status(200)
          .json({ message: "SMS sent successfully", sid: message.sid });
      })
      .catch((error) => {
        console.error("Error sending SMS:", error);
        res.status(500).json({ message: "Error sending SMS", error: error });
      });
  },
};
