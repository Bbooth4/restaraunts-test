const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

const corsOptions = { origin: '*', optionsSuccessStatus: 200 };
app.use(cors(corsOptions));

const PORT = 9004;

app.get("/", (req, res) => res.json({success: 'success'}));

app.get("/cuisine", async (req, res) => {
  const result = new Promise((r, rej) => {
    axios.get(req.query.url)
    .then(res => {
      let cuisine = 'other';
      if (res) {
        if (/apanese/.test(res.data)) cuisine = 'Japanese';
        else if (/ietnamese/.test(res.data)) cuisine = 'Vietnamese';
        else if (/hinese/.test(res.data)) cuisine = 'Chinese';
        else if (/talian/.test(res.data)) cuisine = 'Italian';
        else if (/rench/.test(res.data)) cuisine = 'French';
        else if (/editerranean/.test(res.data)) cuisine = 'Mediterranean';
        else if (/ndian/.test(res.data)) cuisine = 'Indian';
        else if (/merican/.test(res.data)) cuisine = 'American';
        else if (/thai/.test(res.data)) cuisine = 'Thai';
        r(cuisine);
      } else r(cuisine);
    })
    .catch(err => {
      let cuisine = 'other';
      r(cuisine);
    });
  });

  result
    .then(resp => res.json(resp))
    .catch(err => res.json({failure: 'failure'}));
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));

module.exports = { app };
