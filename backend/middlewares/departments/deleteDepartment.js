import models from '../../models';

export default (req, res, next) => {
    let { uuid, name } = req.body;

    models.Department.findById(uuid).then( item => {
        item.destroy({ force: true }).then( () => {

            res.status(201).json({ status:201, message: `Department "${name}" was deleted successfully` })

        }).catch( e => next(e));

    }).catch( e => next(e));
}