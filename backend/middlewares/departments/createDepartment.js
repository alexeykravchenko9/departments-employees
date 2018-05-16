import models from '../../models';

export default (req, res, next) => {
    const { name, description } = req.body;

    models.Department.create({ name, description })
        .then( data => {

            // const io = req.io;
            req.io.emit('emitInRequest', { data: data });

            res.status(201).json({ status: 201, message: 'Department was added successfully' })
        })
        .catch(e => next(e) );
}
