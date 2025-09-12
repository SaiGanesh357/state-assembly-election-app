const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/participantController');

router.post('/', ctrl.create);           // Create participant (frontend sends id,name,age,constituency)
router.get('/', ctrl.getAll);
router.put('/:id', ctrl.updateById);
router.delete('/:id', ctrl.deleteById);

module.exports = router;
