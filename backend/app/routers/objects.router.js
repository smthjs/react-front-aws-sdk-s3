const { Router } = require('express');
const objectsController = require('../controllers/objects.controller.js');
const router = Router();

router.get('/', objectsController.getListObjects);
router.delete('/', objectsController.doRemoveObject);
 
module.exports = router;