const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (request, response) => {
    response.json({"message": "Irish Heritage Sites (Root). Hello!"});
});


app.listen(8000, () => {
    console.log("Server listening on port 8000 . . . ");
});
