import React from "react";
import './style.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deletePost } from "../../actions/posts";
import default_image from '../../assets/default_image.png'

const Post = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = () => {
        navigate('/create', { state: { post } });
    };

    const handleDelete = async () => {
        try {
            // Dispatch delete post action with the post id
            await dispatch(deletePost(post._id));

            // Optionally redirect to home or other page after delete
            navigate('/');
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };
    return (
        <div className="card-container">
            <img src={post.image || default_image} alt={post.title} className="card-image" />
            <div className="card-content">
                <div className="card-title">{post.title}</div>
                <div className="card-description">{post.description}</div>
            </div>

            <div className="card-actions">
                <FaEdit className="card-action-icon edit-icon" title="Edit" onClick={handleEdit} />
                <FaTrash className="card-action-icon delete-icon" title="Delete" onClick={handleDelete} />
            </div>
        </div>
    );
};

export default Post;
