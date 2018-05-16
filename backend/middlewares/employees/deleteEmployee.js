import models from '../../models';

export default (req, res, next) => {

    const { uuid } = req.body;

    models.Employee.findById(uuid).then( item => {
        item.destroy()
            .then( () => res.status(201).json({ status: 201, message: `Employee was deleted successfully` }))
            .catch( e =>  next(e) );
    }).catch( e => next(e));

}