const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: '2RSsbvuQS0i7motTGLkVzlgpMrKZkYH/2R/IsOhFX5hxDJqTNA+kOitbGDs3qdOh5Pgb8hK6gVCjbj1dswxDBUgoWk+vYQV6xXxOidck0CP3adQfZSJ9gBJO1A0FsIlY1DyJG4rKg2c2kjl9SW8tPWgdB04t89/1O/w1cDnyilFU=', // ห้ามใช้ Channel Secret นะ
  channelSecret: 'e327f6a6eaa21063719c5ed7bead6dc8' // ใช้ของจริงที่ได้มา
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
const userId = 'U20cf5869a3af24b67096ea0dffcd7fd8';

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