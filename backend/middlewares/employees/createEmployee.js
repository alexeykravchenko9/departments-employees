import models from '../../models';

export default (req, res, next) => {
    const { firstName, lastName, age, phone, fullAddress, DepartmentUuid } = req.body;

    models.Employee.create({ firstName, lastName, age, phone, fullAddress, DepartmentUuid })
        .then( data => res.status(201).json({ status: 201, message: "Employee was added successfully" }))
        .catch( e => next(e));
}