const express = require("express");
const {
    createComment,
    getCommentsByResource,
    updateComment,
    deleteComment,
} = require("../controllers/commentController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createComment);
router.get("/:resourceId", getCommentsByResource);
router.put("/:commentId", authenticate, updateComment);
router.delete("/:commentId", authenticate, deleteComment);

module.exports = router;
