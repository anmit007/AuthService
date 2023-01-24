const express= require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/server-config');
const apiRoutes = require('./routes/index');
const app =  express();
const UserService = require('./services/user-service');

const prepareAndStartServer = () =>
{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,async ()=>{
        console.log(`SERVER STARTED ON PORT :  ${PORT}`);
    })
}
prepareAndStartServer();