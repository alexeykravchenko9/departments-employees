import models from '../../models';

export default (req, res, next) => {
    models.Department.findAll()
        .then( data => res.status(200).json({ data }))
        .catch(e => next(e) );
}