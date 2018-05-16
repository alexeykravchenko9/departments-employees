import models from '../../models';
import passport from '../../auth/passportStrategy';
import jwt from "jsonwebtoken";


export default (req, res, next) => {
    const { username, password } = req.body;

    models.User.create({ username, password })
        .then( data => {

            passport.authenticate('local', (err, user) => {
                if (err) {
                    next(err);
                }
                const { uuid, username } = user.dataValues;
                const payLoad = {
                    uuid: uuid,
                    username: username
                };

                const token = jwt.sign(payLoad, 'departmentsecret');
                const output = 'You registered and logged successfully';

                res.cookie('authTok', token ).status(201).json({ status: 201, data: output, token })

            })(req, res, next);

        })
        .catch(e => next(e));
}
