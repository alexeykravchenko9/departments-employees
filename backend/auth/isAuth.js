
import passport from 'passport';

export default (req, res, next) => {

    passport.authenticate('jwt', { session: false }, (err, user) => {

        if (err) {
            next(err);
        }

        if (!user){
            const result = { data: [] };
            res.json(result);
        } else {
            next();
        }

    })(req, res, next);

}
