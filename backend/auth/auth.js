import express from 'express';
import passport from './passportStrategy';

import registerUser from "../middlewares/users/registerUser";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', (req, res) => {

    passport.authenticate('local', (err, user) => {
        let output = '';
        let token = 0;
        let status;
        let customError = false;

        if (!user) {
            output = 'Incorrect Username or Password';
            status = 403;
            customError = true;

        } else {
            const { uuid, username } = user.dataValues;
            const payLoad = {
                uuid: uuid,
                username: username
            };


            token = jwt.sign(payLoad, 'departmentsecret');
            status = 200;
            output = 'Logged successfully';
            res.cookie('authTok', token );
        }

        res.json({ status, data: output, customError });


    })(req, res);

});


export default router;