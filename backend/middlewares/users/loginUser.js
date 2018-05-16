import passport from 'passport';

import models from '../../models';

export default (req, res, next) => {
    const { username, password } = req.body;

    passport.authenticate('local',  { failureRedirect: '/login' }), (req, res) => {}

}