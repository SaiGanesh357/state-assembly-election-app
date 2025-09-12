const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/electionController');

router.post('/', ctrl.create);           // Create election (frontend sends id,name,date,constituency)
router.get('/', ctrl.getAll);
router.put('/:id', ctrl.updateById);
router.delete('/:id', ctrl.deleteById);

module.exports = router;
