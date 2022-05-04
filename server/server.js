const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5003;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/users/register', (req, res) => {
    res.send('')
})





app.listen(port, () => {
    console.log(`App listening on port: ${port}, host: http://localhost:${port}`)
})