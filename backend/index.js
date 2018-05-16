import express from 'express';
import * as http from 'http';
import Server from 'socket.io';

import employees from './router/employees';
import departments from './router/departments';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';

//sockets tests
import models from './models';

// Auth middlewares
import auth from './auth/auth';
import isAuth from './auth/isAuth';

import db from './models';
import Boom from 'boom';
import configApp from './config';


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const { port, hostname } = configApp();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use( bodyParser.json() );

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
   res.send('Server is running');
});

app.use((req, res, next) => {
   req.io = io;
   next();

});

app.use('/', auth);

app.use('/employees', isAuth, employees);

app.use('/departments', isAuth, departments);


io.on('connection', (client) => {
    console.log('--------------------SOCKET CONNECTED--------------------' + client.id);

    client.emit('connectionSuccess', { message: 'Socket connected'});

    client.on('action', (action) => {
        
        if (action.type === 'server/fetchDepartments') {

            models.Department.findAll()
                .then( data => io.emit('action', { type:'FETCH_DEPARTMENTS_IO', payLoad: data} ) )
                .catch(e => next(e) );

        }

            
    });

    // client.on('departments/fetchDepartmentsSoc', () => {
    //
    //     models.Department.findAll()
    //         .then( data => io.emit('departments/fetchDepartmentsSoc', data))
    //         .catch(e => next(e) );
    //
    // });

});

app.use( (err, req, res, next) => {

    res.json( (!Boom.isBoom(err)) ? Boom.boomify(err).errors : err.output.payload );

});

db.sequelize.sync().then( () => {

    server.listen(port, hostname, () => {

        console.log(`Server is running on http://${hostname}:${port}`);

    });



}).catch( err => err );