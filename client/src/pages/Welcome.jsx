import React, { useEffect } from "react";
import './Welcome.css';
import Posts from "./Posts";
import { getPosts } from '../actions/posts'
import { useDispatch } from 'react-redux'
import { Container, Grow, Stack, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    const handleCreateButton = () => {
        navigate('/create')
    }
    return (
        <Container maxWidth="lg">
            <div className="button-container">
                <Button variant="contained" className="button-style" onClick={handleCreateButton}>
                    Create New Post
                </Button>
            </div>
            <Grow in>
                <Container>
                    <Stack spacing={2} justifyContent="space-between" alignItems='stretch'>
                        <Stack item xs={12} sm={7}>
                            <Posts />
                        </Stack>
                    </Stack>
                </Container>
            </Grow>
        </Container>
    );
}
