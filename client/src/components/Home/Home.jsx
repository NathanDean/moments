// React + Redux
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

// Material UI
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Typography } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

// Components
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination/Pagination";

// Actions
import { getPostsBySearch } from "../../actions/posts";

// Styling
import useStyles from "./styles"

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

const Home = () => {

    // Hooks
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();

    // State
    const [currentId, setCurrentId] = useState(null);
    const [term, setTerm] = useState("");
    const [tags, setTags] = useState([]);

    // Variables
    //// Checks URL for parameter called "page"
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");

    // Functions
    const handleKeyPress = e => {
        if(e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAdd = tag => {setTags([...tags, tag])}

    const handleDelete = tagToDelete => {setTags(tags.filter(tag => tag !== tagToDelete))};

    const searchPost = () => {
        if(term.trim() || tags) {
            dispatch(getPostsBySearch({
                term,
                tags: tags.join(",")
            }))
            history.push(`/posts/search?term=${term || "none"}&tags=${tags.join(",") || "none"}`)
        } else {
            history.push("/");
        };
    };

  return (

    <Grow in>

        <Container maxWidth = "xl">

            <Grid className = {classes.gridContainer} container justifyContent = "space-between" alignItems = "stretch" spacing = {3}>

                <Grid item xs = {12} sm = {6} md = {9}>

                    <Posts setCurrentId = {setCurrentId} />

                </Grid>

                <Grid item xs = {12} sm = {6} md = {3}>

                    <Form currentId = {currentId} setCurrentId = {setCurrentId} />

                    <AppBar className = {classes.appBarSearch} position = "static" color = "inherit">

                        <Typography variant = "h6">Find a moment</Typography>
                        
                        <TextField 
                            className = {classes.input}
                            name = "search" 
                            variant = "outlined" 
                            label = "Keyword" 
                            value = {term}
                            fullWidth
                            onChange = {e => {setTerm(e.target.value)}}
                            onKeyPress = {handleKeyPress}
                        />

                        <ChipInput 
                            className = {classes.input}
                            style = {{margin: "10px 0"}}
                            value = {tags}
                            label = "Tags"
                            variant = "outlined"
                            onAdd = {handleAdd}
                            onDelete = {handleDelete}
                        />


                        <Button className = {classes.searchButton} color = "primary" variant = "contained" onClick = {searchPost}>Search</Button>

                    </AppBar>

                    <Paper className = {classes.pagination} elevation = {6}>

                    <Pagination page = {page} />

                    </Paper>

                </Grid>

            </Grid>

        </Container>

    </Grow>

  )

}

export default Home