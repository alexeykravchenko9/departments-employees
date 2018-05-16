import models from '../../models';

export default (req, res, next) => {
    models.Employee.findAll({
        where: {
            DepartmentUuid: req.params.id
        }
    }).then( data => res.status(200).json({ status: 200, data }))
      .catch( e => next(e));
}