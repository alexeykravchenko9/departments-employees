import models from '../../models';

export default (req, res, next) => {
    const { uuid, name, description } = req.body;

    models.Department.findById(uuid).then( item => {
        item.update({ name, description })
            .then( (data) => res.status(201).json({ status:201, message: 'Department was edited successfully' }))
            .catch(e => next(e) );

    }).catch(e => next(e));

}