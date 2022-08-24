//React + Redux
import React from "react";
import { useSelector } from "react-redux";

// MaterialUI
import { Grid, CircularProgress } from "@material-ui/core";

// Components
import Post from "./Post/Post"

// Styling
import useStyles from "./styles"

const Posts = ({setCurrentId}) => {
  
  // Hooks
  const classes = useStyles();

  // Variables
  const { posts, isLoading } = useSelector(state => state.posts);
  
  if(!posts.length && !isLoading) {
    return "No posts to display."
  }

  return (

    isLoading ? 
      
      <CircularProgress /> 
    
    : (

      <Grid
        className = {classes.container}
        container 
        alignItems = "stretch"
        spacing = {3}
      >

        {/* Why does this use round bracket for arrow function instead of curly */}
        {posts.map(post => (
          <Grid 
            key = {post._id} 
            item
            xs = {12}
            sm = {12}
            md = {6}
            lg = {4}
            xl = {3}
          >
            
            <Post post = {post} setCurrentId = {setCurrentId} />

          </Grid>
        ))}

      </Grid>

    )
    
  )

}

export default Posts