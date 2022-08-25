import axios from "axios";

const API = axios.create({
    baseURL: "https://serene-thicket-75792.herokuapp.com/"
});

// const API = axios.create({
//     baseURL: "http://localhost:5000"
// });


// Passes token to middleware
API.interceptors.request.use(req => {
    if(localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }

    return req
})

export const fetchPosts = page => API.get(`/posts?page=${page}`);
export const fetchPost = id => API.get(`/posts/${id}`);
export const fetchPostsBySearch = searchQuery => API.get(`/posts/search?term=${searchQuery.term || "none"}&tags=${searchQuery.tags}`)
export const createPost = newPost => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.patch(`/posts/${id}/likePost`);
export const createComment = (comment, id) => API.post(`/posts/${id}/createComment`, {comment});

export const signup = formData => API.post("/user/signup", formData);
export const signin = formData => API.post("/user/signin", formData);