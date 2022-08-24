// React + Redux
import React from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Material UI
import { Card, CardActions, CardContent, CardMedia, Button, ButtonBase, Typography } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

// Other third party
import moment from "moment";

// Components
import Likes from "./Likes";

// Actions
import { deletePost, likePost } from "../../../actions/posts"

// Styling
import useStyles from "./styles";

const Post = ({post, setCurrentId}) => {

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // Variables
  const user = JSON.parse(localStorage.getItem("profile"));
  const openPost = () => {history.push(`/posts/${post._id}`)};

  // Functions
  const handleLike = async () => {
    dispatch(likePost(post._id));
  }

  return (

    <Card className = {classes.card} raised elevation = {6}>

      <ButtonBase 
        component = "span"
        className = {classes.cardAction}
        onClick ={openPost}
      >

        <CardMedia
          className = {classes.media}
          image = {post.selectedFile}
          title = {post.title}
        />

        <div className = {classes.overlay}>

          <Typography variant = "h6">{post.name}</Typography>
          <Typography variant = "body2">{moment(post.createdAt).fromNow()}</Typography>

        </div>

        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (

          <div className={classes.overlay2}>

            <Button 
              style = {{color: "white"}} 
              size = "small"
              onClick = {e => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >

            <MoreHorizIcon fontSize = "medium" />

            </Button>

          </div>

        )}

        <Typography
              className = {classes.title}
              component = "h2"
              variant = "h5"
              gutterBottom
            >

              {post.title}
            
        </Typography>

        <CardContent>

          <Typography
              className = {classes.message}
              variant = "body1"
              color = "textSecondary"
              component = "p"
              gutterBottom
            >

              {post.message}
            
          </Typography>

        </CardContent>

        <div className={classes.details}>

          <Typography
            variant = "body2"
            color = "textSecondary"
            component = "h2"
          >

            {post.tags.map(tag => `#${tag} `)}

        </Typography>

</div>

      </ButtonBase>

      <CardActions className = {classes.cardActions}>

        <Button size = "small" color = "primary" disabled = {!user?.result} onClick = {handleLike}>

          <Likes post = {post} user = {user} />

        </Button>

        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (

          <Button size = "small" color = "primary" onClick = {() => dispatch(deletePost(post._id))}>

          <DeleteIcon fontSize = "small" />
          Delete

          </Button>

        )}

      </CardActions>

    </Card>
  )
}

export default Post