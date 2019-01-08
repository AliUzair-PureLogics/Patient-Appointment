const express = require('express')
const app = express()
const mongoose = require('mongoose')

const userRoutes = require('./routes/users')

mongoose.connect('mongodb://shahzaib.imran:purelogics94@ds149344.mlab.com:49344/docdb', {useNewUrlParser: true })
        .then(
            () => console.log('DB Connected'),
            (err) => console.log(err)
        )

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api',userRoutes)

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})