const express = require('express')
const app = express();
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
 
var message_text=""
client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Welcome to MQTT protocol')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  message_text = message.toString()
  client.end()
})


app.get('/', (req, res) => {
  res.send(message_text)
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});