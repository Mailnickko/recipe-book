const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './variables.env' });

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(`Something went wrong: ${err}`));

let PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
