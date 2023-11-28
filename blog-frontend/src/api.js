// src/api.js

import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export const getPosts = () => axios.get(`${apiUrl}/posts`);
export const getSearchedPosts = (title) => axios.get(`${apiUrl}/posts?title=${title}`);
export const createPost = (postData) => axios.post(`${apiUrl}/posts`, postData);
export const updatePost = (postId, postData) => axios.put(`${apiUrl}/posts/${postId}`, postData);
export const deletePost = (postId) => axios.delete(`${apiUrl}/posts/${postId}`);
