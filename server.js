const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'RSsbvuQS0i7motTGLkVzlgpMrKZkYH/2R/IsOhFX5hxDJqTNA+kOitbGDs3qdOh5Pgb8hK6gVCjbj1dswxDBUgoWk+vYQV6xXxOidck0CP3adQfZSJ9gBJO1A0FsIlY1DyJG4rKg2c2kjl9SW8tPWgdB04t89/1O/w1cDnyilFU=', // ห้ามใช้ Channel Secret นะ
  channelSecret: 'e327f6a6eaa21063719c5ed7bead6dc8' // ใช้ของจริงที่ได้มา
};

const client = new line.Client(config);
const app = express();

app.use(express.json());

// ใส่ userId ของคุณที่ได้จาก event.source.userId
const userId = 'U20cf5869a3af24b67096ea0dffcd7fd8';

app.post('/send_line_message', async (req, res) => {
  const message = req.body.message || "Hello from server";

  try {
    await client.pushMessage(userId, {
      type: 'text',
      text: message
    });

    res.status(200).send('✅ Message sent to user!');
  } catch (error) {
    console.error('[LINE PUSH ERROR]', error.response?.data || error.message);
    res.status(500).send('❌ Failed to send message.');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});