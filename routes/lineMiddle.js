const express = require('express');
const router = express.Router();
const axios = require('axios');
const logger = require('morgan');
require('dotenv').config();
const {
  Payload
} = require('dialogflow-fulfillment');
const {
  getPolution
} = require('../controller/linemessage');
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.LINE}`
}
router.get('/', async (req, res) => {

  return res.status(200).json({
    status: true
  });
});
router.post('/', async (req, res) => {
  if (req.method === "POST") {
    let event = req.body.events[0];
    if ((event.type === "message" && event.message.type === "text") || (event.type === "postback")) {
      postToDialogflow(req);
    } else if (event.message.type === "location") {
      try {
        let payload = await getPolution(event.message.latitude, event.message.longitude);
        await reply(event.replyToken, payload);
      } catch (err) {
        console.log(err);
      }
    } else {
      reply(event.replyToken, {
        type: "text",
        text: event.message.type
      });
    }

  }
  return res.status(200).send(req.method);
});
const reply = async (replyToken, message) => {
  try {
    await axios({
      url: `${LINE_MESSAGING_API}/reply`,
      headers: LINE_HEADER,
      method: "post",
      data: JSON.stringify({
        replyToken: replyToken,
        messages: [message]
      })
    });
  } catch (err) {
    console.log(err);
  }
};
const postToDialogflow = async payloadRequest => {
  payloadRequest.headers.host = "dialogflow.cloud.google.com";
  await axios({
    url: process.env.DIALOGFLOW,
    headers: payloadRequest.headers,
    method: "post",
    data: payloadRequest.body
  });
};
module.exports = router;