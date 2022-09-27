// React + Redux
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// Material UI
import {Paper, Typography, CircularProgress, Divider} from "@material-ui/core" ;

// Other third party
import moment from "moment";

// Components
import CommentSection from "./CommentSection";

// Actions
import { getPost, getPostsBySearch } from "../../actions/posts";

// Styling
import useStyles from "./styles";

const Post = () => {

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // Variables
  const {post, posts, isLoading} = useSelector(state => state.posts)
  const {id} = useParams();

  // Effects
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({
        term: "none", 
        tags: post?.tags.join(",")
      }))
    }
  }, [post])

  if(!post) {
    return null
  };

  const recommendedPosts = posts.filter(({_id}) => _id !== post._id)

  const openPost = _id => history.push(`/posts/${_id}`);

  if(isLoading) {
    return (
      <Paper className = {classes.loadingPaper} elevation = {6}>
        <CircularProgress size = "7em" />
      </Paper>
    )
  }

  return (

    <Paper style = {{ padding: '20px', borderRadius: '15px' }} elevation = {6}>

      <div className = {classes.card}>

        <div className={classes.section}>

          <Typography variant="h3" component="h2">{post.title}</Typography>

          <Typography className = {classes.tags} gutterBottom variant="body2" color="textSecondary" component="h2">{post?.tags.map((tag) => `#${tag} `)}</Typography>

          <Typography className = {classes.message} gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="body2">Created by: {post.name}</Typography>

          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>

          <Divider style={{ margin: '20px 0' }} />

          <CommentSection post = {post} />

          <Divider style={{ margin: '20px 0' }} />

        </div>

        <div className={classes.imageSection}>

          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />

        </div>


      </div>

      {recommendedPosts?.length ? (
        <div className = {classes.section}>

          <Typography gutterBottom variant = "h5">You might also enjoy</Typography>

          <Divider />

          <div className = {classes.recommendedPosts}>
            {recommendedPosts.map(({title, name, message, selectedFile, _id}) => (
              <div key = {_id} style = {{margin: "20px", cursor: "pointer"}} onClick = {() => openPost(_id)}>
                  <Typography gutterBottom variant = "h6">{title}</Typography>
                  <Typography gutterBottom variant = "subtitle2">{name}</Typography>
                  <Typography gutterBottom variant = "subtitle2">{message}</Typography>
                  <img src = {selectedFile} width = "200px" alt = "" />
              </div>
            ))}
          </div>

        </div>
      ) : null}
      
    </Paper>

  )
  
}

export default Post