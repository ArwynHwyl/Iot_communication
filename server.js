const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: '2RSsbvuQS0i7motTGLkVzlgpMrKZkYH/2R/IsOhFX5hxDJqTNA+kOitbGDs3qdOh5Pgb8hK6gVCjbj1dswxDBUgoWk+vYQV6xXxOidck0CP3adQfZSJ9gBJO1A0FsIlY1DyJG4rKg2c2kjl9SW8tPWgdB04t89/1O/w1cDnyilFU=', // ห้ามใช้ Channel Secret นะ
  channelSecret: 'e327f6a6eaa21063719c5ed7bead6dc8' // ใช้ของจริงที่ได้มา
};

const client = new line.Client(config);

const app = express();
app.use(express.json());

app.post('/send_line_message', async (req, res) => {
  const message = req.body.message || "Hello from M5Stack";

  try {
    // ส่ง broadcast message ไปหาทุกคนที่เป็นเพื่อนกับบอท
    await client.broadcast({
      type: 'text',
      text: message
    });

    res.status(200).send('Broadcast message sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send broadcast message');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});