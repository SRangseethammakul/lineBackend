const express = require('express');
const router = express.Router();
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
    "Content-Type": "application/json",
    Authorization: `Bearer mPTPwCDDSVAujVGodPG9sRtQVD8/dq7ZYpiGNPY0PwSuAkQNYsX5OuH2mxnhXwwq/lAYnj3Lc8lC9oyF3Tu5rJLcoFQCPwNBs1tCnk1X79jfLfuj0SdQZ382z4+TGitYIgXSx9DEAj/x68j5MA5awgdB04t89/1O/w1cDnyilFU=`
}
router.get('/', async (req, res) => {

  return res.status(200).json({
      status: true
  });
});
router.post('/', async (req, res) => {
  if (req.method === "POST") {
    let event = req.body.events[0]
    if (event.type === "message" && event.message.type === "text") {
      postToDialogflow(req);
    } else {
      reply(req);
    }
  }
  return res.status(200).send(req.method);
});

  
  const reply = req => {
    return request.post({
      uri: `${LINE_MESSAGING_API}/reply`,
      headers: LINE_HEADER,
      body: JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "text",
            text: JSON.stringify(req.body)
          }
        ]
      })
    });
  };
  const postToDialogflow = req => {
    req.headers.host = "bots.dialogflow.com";
    return request.post({
      uri: "https://dialogflow.cloud.google.com/v1/integrations/line/webhook/825c62bf-c875-4b48-a015-3e031c5d346d",
      headers: req.headers,
      body: JSON.stringify(req.body)
    });
  };
module.exports = router;