import models from '../../models';

export default (req, res, next) => {
    const { uuid, firstName, lastName, age, phone, fullAddress } = req.body;

    models.Employee.findById(uuid).then( item => {

        item.update({ firstName, lastName, age, phone, fullAddress })
          .then( (data) => res.status(201).json({ status: 201, message: `Employee was edited successfully`, data }))
          .catch( e => next(e) );

    }).catch( e => next(e) );
}