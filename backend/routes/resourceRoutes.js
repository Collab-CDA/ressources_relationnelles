const express = require('express');
const multer = require('multer');
const { createResource, getAllResources, getUserResources, updateResource, updateResourceStatus, deleteResource } = require('../controllers/resourceController');
const authenticate = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/', getAllResources);
router.get('/user/:id', getUserResources);
router.post('/create', authenticate, upload.array('files', 10), createResource);
router.put('/update/:id', authenticate, upload.array('files', 10), updateResource);
router.put('/status/:id', authenticate, checkRole(['Admin', 'Super-Admin']), updateResourceStatus);
router.delete('/delete/:id', authenticate, checkRole(['Admin', 'Super-Admin']), deleteResource);

module.exports = router;
