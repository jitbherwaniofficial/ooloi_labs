const express = require('express'); 
const app = express();

const mongoose = require('mongoose')

const event_page_routes = require('./routes/event_page_routes')

require('dotenv/config');

const cors = require('cors');
const morgan = require('morgan');
app.use(cors());
app.options('*',cors());

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan("tiny"))
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use('/event', event_page_routes)

mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>{
        console.log('DATABASE CONNECTED');
    }).catch((err)=>{
        console.log(err);
    })

app.listen(PORT, () =>{
    console.log(`server is runninhg on http://localhost:${PORT}`);
})    