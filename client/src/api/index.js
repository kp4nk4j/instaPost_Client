import axios from 'axios'

const url = 'https://instapost-server.up.railway.app/posts'

export const fetchPosts = () => axios.get(url)
export const createPost = (newPost) => axios.post(url, newPost)
export const updatePost = (id, updatedPost) => axios.put(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);