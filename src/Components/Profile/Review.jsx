import { Box, Button, Container, Rating, TextField, Typography } from "@mui/material";
import { useContext, useState } from 'react';
import { BookContext } from "../../context/BookContext";

const Review = ({ handleCloseModal, bookId, setShowSnackbar }) => {
    const [comment, setComment] = useState("");
    const [stars, setStars] = useState(5);
    const { addReview } = useContext(BookContext);
    const [formValid, setFormValid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addReview(comment, stars, bookId);
        handleCloseModal();
        setShowSnackbar(true);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
        validateForm(e.target.value, stars);
    };

    const handleRatingChange = (newValue) => {
        setStars(newValue);
        validateForm(comment, newValue);
    };

    const validateForm = (comment, stars) => {
       
        const isValid = comment.trim() !== "" && stars !== 0;
        setFormValid(isValid);
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
               padding:"10px"
            }}
        >
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    id="comment"
    label="Comment"
    name="comment"
    autoComplete="comment"
    autoFocus
    value={comment}
    onChange={handleCommentChange}
    sx={{
        marginBottom: "16px",
      
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#000', 
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--profile)', 
            
        },
    }}
/>

                <Box
                  
                >
                    <Typography component="legend">Stars</Typography>
                    <Rating
                        name="simple-controlled"
                        value={stars}
                        onChange={(event, newValue) => handleRatingChange(newValue)}
                        sx={{
                            '& .MuiSvgIcon-root': {
                                color: 'var(--profile)', 
                            },
                        }}
                    />
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    
                    style={{
                        marginTop: "16px",
                        backgroundColor: "var(--profile)",
                        color: "white", 
                    }}
                    disabled={!formValid} 
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default Review;
