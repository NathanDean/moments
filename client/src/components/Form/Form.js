// React + Redux
import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Material UI
import { TextField, Button, Typography, Paper } from "@material-ui/core";

// Other third party
import FileBase from "react-file-base64";

// Actions
import { createPost, updatePost } from "../../actions/posts";

// Styling
import useStyles from "./styles"

const Form = ({currentId, setCurrentId}) => {

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  // State
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: ""
  });

  // Variables
  //// Stores currently selected post for editing
  const post = useSelector(state => currentId ? 
    state.posts.posts.find(post => post._id === currentId)
    : 
    null
  );

  const user = JSON.parse(localStorage.getItem("profile"));

  // Effects
  //// Loads post data to form on selecting a post for editing
  useEffect(() => {
    if(post) {
      setPostData(post)
    }
  }, [post])

  // Functions
  const clear = () => {
    setCurrentId(null)
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: ""
    })
  };

  const handleSubmit = e => {

    e.preventDefault();

    if(currentId){
      dispatch(updatePost(currentId, {
        ...postData, 
        name: user?.result?.name
      }));
    } else {
      dispatch(createPost({
        ...postData, 
        name: user?.result?.name
      }, history));
    }

    clear();

  };

  if(!user?.result?.name) {

    return(
      <Paper className = {classes.paper}>

        <Typography variant = "h6" align = "center">
          
          Please sign in to create a moment.
          
        </Typography>

      </Paper>
    )
  }

  return (
    
    <Paper className = {classes.paper} elevation = {6}>
      
      <form 
        className = {`${classes.root} ${classes.form}`} 
        autoComplete = "off" 
        onSubmit = {handleSubmit}
        noValidate 
      >

        <Typography className = {classes.formHeader} variant = "h6">{currentId ? "Edit" : "Create"} a moment</Typography>

        <TextField 
          name = "title" 
          variant = "outlined" 
          label = "Title" 
          fullWidth 
          value = {postData.title}
          // Research why we need to spread data in this function
          onChange = {e => setPostData({...postData, title: e.target.value})}
        />

        <TextField 
          name = "message" 
          variant = "outlined" 
          label = "Message" 
          fullWidth 
          value = {postData.message}
          onChange = {e => setPostData({...postData, message: e.target.value})}
        />

        <TextField 
          name = "tags" 
          variant = "outlined" 
          label = "Tags" 
          fullWidth 
          value = {postData.tags}
          // How can I change this so it accepts tags separated by spaces as well?
          onChange = {e => setPostData({...postData, tags: e.target.value.split(",")})}
        />

        <div className={classes.fileInput}>

          <FileBase 
            type = "file"
            multiple = {false}
            onDone = {({base64}) => setPostData({...postData, selectedFile: base64})}
          />

        </div>

        <Button
          className = {classes.buttonSubmit}
          variant = "contained"
          color = "primary"
          size = "large"
          type = "submit"
          fullWidth
        >Submit</Button>

        <Button
          variant = "contained"
          color = "secondary"
          size = "small"
          onClick = {clear}
          fullWidth
        >Clear</Button>

      </form>

    </Paper>

  )

}

export default Form