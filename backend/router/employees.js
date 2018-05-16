import express from 'express';

import createEmployee from '../middlewares/employees/createEmployee';
import getEmployee from '../middlewares/employees/getEmployee';
import editEmpoloyee from '../middlewares/employees/editEmployee';
import deleteEmployee from '../middlewares/employees/deleteEmployee';

const router = express.Router();

router.post('/', createEmployee);
router.get('/:id', getEmployee);
router.put('/', editEmpoloyee);
router.delete('/', deleteEmployee);

export default router;