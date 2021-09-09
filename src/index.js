const express = require('express');
const mongoose= require('mongoose');
require('./models/User');
require('./models/Track');
const authRoutes= require('./routes/authRoutes');
const trackRouters = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const app = express();
// using it to pass obj first
app.use(bodyParser.json());

app.use(authRoutes);
app.use(trackRouters);
const pass = 'buithangjbck04' ;
const mongoUri='mongodb+srv://admin:'+pass+'@cluster0.czfa0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri,{
    useNewUrlParser:true ,
    useCreateIndex:true
});
mongoose.connection.on('connected',()=>{
    console.log('Connected succesfully!');
});
mongoose.connection.on('error',(err)=>{
    console.log('Connected fail: '+err);
});
app.get('/',requireAuth,(req,res)=>{
    res.send('your email is : '+ req.user.email);
});
app.listen(3000,()=>{
    console.log('Listening on port 3000');
});