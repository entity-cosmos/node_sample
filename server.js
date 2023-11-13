//sample express
const express = require('express');
//import body parser
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
//get number from body and diplay that value using body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/number', (req, res) => {
    const num1 = req.body.num1;
    const num2 = req.body.num2;
  res.send(`The sum of ${num1} and ${num2} is ${num1 + num2}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
