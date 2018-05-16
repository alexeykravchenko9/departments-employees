import passport from 'passport';
import models from "../models";
import Strategy from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import bcrypt from 'bcrypt';
import configApp from '../config';

const jwtsecret = configApp().jwtsecret;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtsecret
};

// Strategy for login
passport.use(new Strategy({ sessions: false },(username, password, done) => {

         models.User.findOne({ where: { username: username } }).then( user => {
             if (!user){
                 return done(null, false);
             }

             bcrypt.compare(password, user.password ).then( res => (res) ? done(null, user) : done(null, false) )

        }).catch(e => done(e));

}));

// Strategy for secure routes and check user on JWT
passport.use(new JwtStrategy(jwtOptions, (payload, done) => {

    models.User.findOne({ where: { uuid: payload.uuid }}).then( user => {
        if (user){
            done(null, user)
        } else {
            done(null, false)
        }
        
    }).catch( e => done(e))

}));


export default passport;