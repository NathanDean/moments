import express from "express";

import { 
    getPosts, 
    getPost, 
    getPostsBySearch, 
    createPost, 
    updatePost, 
    deletePost, 
    likePost, 
    createComment 
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/createComment", createComment)

export default router;