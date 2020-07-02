const connection = require('./config/config.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes/heritageSite.routes.js')(app);

mongoose.connect(connection.database.url, {

  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: connection.database.dbName
})
.then(() => {

  console.log("Successfully connected to the MongoDB database");

  app.listen(8000, () => {
      console.log("Listening on port 8000 . . . ");
  });
})
.catch(err => {

  console.log('Unable to connect to the MongoDB database', err);
  process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Irish Heritage Sites (Root)"});
});
