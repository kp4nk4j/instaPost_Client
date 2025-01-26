import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import './style.css';

const Posts = () => {
    const posts = useSelector((state) => state.posts);

    return !posts.length ? (
        <div className="no-data-message">Data to be added yet</div>
    ) : (
        <div className="card-grid">
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
};

export default Posts;
