import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { AiOutlineCheckCircle } from 'react-icons/ai';  // Green check
import { AiOutlineCloseCircle } from 'react-icons/ai';  // Red cross
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../actions/posts';
import { useNavigate, useLocation } from 'react-router-dom';
import './PostForm.css';

const PostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [editing, setEditing] = useState(false);

    // Ensure location.state and location.state.post exist before destructuring
    const post = location?.state?.post;
    const _id = post?._id;

    useEffect(() => {
        // Only proceed if location.state and location.state.post exist
        if (post) {
            const { title, description, image } = post;
            setTitle(title || '');
            setDescription(description || '');
            setImage(image || null);
            setEditing(true);
        }
    }, [post]);  // Dependency on post ensures the effect runs only when post is updated

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const isImage = selectedImage.type.startsWith('image/');
            if (isImage) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImage(reader.result); // Save Base64 string in state
                    setImageError(false);
                };
                reader.readAsDataURL(selectedImage); // Convert file to Base64
            } else {
                setImage(null);
                setImageError(true); // Invalid file
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            description,
            image, // Base64 string
        };

        try {
            if (editing && _id) {
                await dispatch(updatePost(_id, postData));
            } else {
                await dispatch(createPost(postData));
            }
            navigate('/');
        } catch (error) {
            console.error('Error during post creation:', error);
        }
    };

    // Check if `post` exists or show a loading or empty state
    if (!post && editing) {
        return (
            <div className='form-container'>
                <p>Post not found. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className='form-container'>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <Button variant="contained" component="label">
                    Upload Image
                    <input type="file" hidden onChange={handleImageChange} />
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    {imageError ? (
                        <AiOutlineCloseCircle style={{ color: 'red', marginRight: '10px', marginTop: -1 }} />
                    ) : image ? (
                        <AiOutlineCheckCircle style={{ color: 'green', marginRight: '10px', marginTop: -1 }} />
                    ) : null}
                    <span>{image ? 'Image Uploaded' : imageError ? 'Invalid Image' : ''}</span>
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    {editing ? 'Update Post' : 'Submit'}
                </Button>
            </Box>
        </div>
    );
};

export default PostForm;
