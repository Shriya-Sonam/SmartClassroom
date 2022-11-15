const express = require('express');
const  mongoose = require("mongoose");

const app = express();
const port = 5000;

mongoose.connect("mongodb://localhost/virtual_class", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useFindAndModify:false
});

app.use(express.json({ extended: false }));

app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/tpost', require('./routes/tpost'));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

