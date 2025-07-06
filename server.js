const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'ใส่-channel-access-token-ของคุณ',
  channelSecret: 'ใส่-channel-secret-ของคุณ'
};

const client = new line.Client(config);
const app = express();

app.use(line.middleware(config));
app.use(express.json());

// Webhook endpoint รับ event จาก LINE
app.post('/webhook', (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.status(200).send('OK'))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'text') {
    console.log('User ID:', event.source.userId);
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: `คุณส่งข้อความ: ${event.message.text}`
    });
  }
  return Promise.resolve(null);
}

// API สำหรับส่งข้อความหา userId ที่กำหนด
const userId = 'ใส่-userId-ของคุณ-ที่ได้จาก webhook';

app.post('/send_line_message', async (req, res) => {
  const message = req.body.message || 'Hello from M5Stack';
  try {
    await client.pushMessage(userId, {
      type: 'text',
      text: message
    });
    res.status(200).send('Message sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send message');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
