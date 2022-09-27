// Contains callback functions for routes
import mongoose from "mongoose";
import PostMessage from "../models/PostMessage.js";

export const getPosts = async (req, res) => {

    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const noOfPosts = await PostMessage.countDocuments({});
        
        // Finds posts and sorts by newest, returns number specified by LIMIT starting from startIndex
        const postMessages = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({
            data: postMessages,
            currentPage: Number(page),
            numberOfPages: Math.ceil(noOfPosts / LIMIT)
        });
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const getPost = async (req, res) => {
    
    const {id} = req.params;
    
    try {

        const postMessage = await PostMessage.findById(id);
    
        res.status(200).json(postMessage);
        
    } catch (error) {
        res.status(404).json({message: error.message})
    }

}

export const getPostsBySearch = async (req, res) => {

    const {term, tags} = req.query;

    try {

        const title = new RegExp(term, "i");

        const postMessages = await PostMessage.find({
            $or: [
                {title}, 
                {tags: {$in: tags.split(",")}}
            ]
        })

        res.status(200).json({data: postMessages})

    } catch (error) {
        res.status(404).json({message: error.message})
    }

}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({
        ...post, 
        creator: req.userId, 
        createdAt: new Date().toISOString()
    });

    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with this ID")
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with this ID")
    }

    await PostMessage.findByIdAndRemove(id);

    res.json({message: "Post deleted"})

}

export const likePost = async (req,res) => {

    const {id} = req.params;

    if(!req.userId) {
        return res.json({message: "Unauthenticated"});
    }

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with this ID")
    }

    try {

        const post = await PostMessage.findById(id);

        // Checks whether id of current user matches id of any user who has already liked the post.
        const index = post?.likes.findIndex(id => id === String(req.userId));

        console.log(index);

        if(index === -1) {
            // If user has not already liked the post, adds their id to list of users who have liked the post
            post.likes.push(req.userId);
        } else {
            // If user has already liked the post, removes their id from list of user who have liked the post
            post.likes = post.likes.filter(id => id !== String(req.userId));
        };

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

        res.json(updatedPost);
        
    } catch (error) {

        res.json({message: error.message})

    }

    
}

export const createComment = async (req, res) => {
    
    const {id} = req.params;
    const {comment} = req.body;

    try {

        const post = await PostMessage.findById(id);
        post?.comments.push(comment);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
        res.json(updatedPost);
        
    } catch (error) {

        res.json({message: error.message})
        
    }



}