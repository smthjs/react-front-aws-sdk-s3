const { Router } = require('express');
const multer = require('../config/multer.config.js');
const filesController = require('../controllers/files.controller.js');
const router = Router();

router.post('/upload', multer.single("file"), filesController.doUpload);
router.get('/download', filesController.doDownload);
 
module.exports = router;