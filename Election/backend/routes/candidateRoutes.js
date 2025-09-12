const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/candidateController');

router.post('/', ctrl.create);           // Create candidate (frontend posts object with id,name,party,constituency)
router.get('/', ctrl.getAll);            // Get all candidates (returns array with objects that have id field)
router.put('/:id', ctrl.updateById);     // Update candidate by frontend id
router.delete('/:id', ctrl.deleteById);  // Delete candidate by frontend id

module.exports = router;


