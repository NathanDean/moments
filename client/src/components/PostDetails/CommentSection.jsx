// React + Redux
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Material UI
import{ Typography, TextField, Button, Divider } from "@material-ui/core";

// Actions
import { createComment } from "../../actions/posts";

// Styling
import useStyles from "./styles";

const CommentSection = ({post}) => {

    // Hooks
    const classes = useStyles();
    const dispatch = useDispatch();

    // State
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");

    // Variables
    const user = JSON.parse(localStorage.getItem("profile"));

    // Functions
    const handleClick = async () => {
        const newComment = `${user.result.name}: ${comment}`;
        
        const newComments = await dispatch(createComment(newComment, post._id));

        // Rerenders component so new comment is displayed immediately rather than on page refresh
        setComments(newComments);
        setComment("");
    }

    return (

        <div>
            
            <div className={classes.commentsOuterContainer}>

            <Typography gutterBottom variant = "h6">
                Comments
            </Typography>
            
            <div className={classes.commentsDisplay}>

                {comments && comments.map((comment, index) => (
                    <Typography key = {index} gutterBottom variant = "subtitle1">
                        {comment}
                    </Typography>
                ))}
                    
            </div>

                
            <div className={classes.leaveCommentContainer}>

                {user?.result?.name && (

                    <div>

                    <Divider style={{ margin: '20px 0' }} />

                    <Typography gutterBottom variant = "h6">Leave a comment</Typography>

                    <TextField 
                        fullWidth
                        minRows = {4}
                        variant = "outlined"
                        label = "Comment"
                        multiline
                        value = {comment}
                        onChange = {e => setComment(e.target.value)}
                    />

                    <Button
                        style = {{marginTop: "10px"}}
                        fullWidth
                        // disabled = {!comment}
                        variant = "contained"
                        color = "primary"
                        onClick = {handleClick}
                    >Add comment</Button>

                    </div>

                )}

            </div>

            </div>

        </div>

    )

}

export default CommentSection