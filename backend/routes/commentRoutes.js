const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, commentController.addComment);

router.get('/resource/:id_ressource_', commentController.getComments);

router.get('/', authenticate, commentController.getComments);

router.get('/:id', commentController.getComment);

router.put('/:id', authenticate, commentController.updateComment);

router.delete('/:id', authenticate, commentController.removeComment);

module.exports = router;
