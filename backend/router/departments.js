import express from 'express';

import createDepartment from '../middlewares/departments/createDepartment';
import getDepartment from '../middlewares/departments/getDepartment';
import editDepartment from '../middlewares/departments/editDepartment';
import deleteDepartment from '../middlewares/departments/deleteDepartment';

const router = express();

router.post('/', createDepartment);
router.get('/', getDepartment);
router.put('/', editDepartment);
router.delete('/', deleteDepartment);

export default router;