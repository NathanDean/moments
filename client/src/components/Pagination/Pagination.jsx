// React + Redux
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Material UI
import { Pagination, PaginationItem } from "@material-ui/lab";

// Actions
import { getPosts } from "../../actions/posts";

// Styling
import useStyles from "./styles";

const Paginate = ({page}) => {

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();

  // Variables
  const { numberOfPages } = useSelector(state => state.posts)

  // Effects
  useEffect(() => {
    if(page){
      dispatch(getPosts(page))
    }
  }, [page])

  return (

    <Pagination
      classes = {{ul: classes.ul}}
      count = {numberOfPages}
      page = {Number(page) || 1}
      variant = "outlined"
      color = "primary"
      renderItem = {item => (
        <PaginationItem {...item} component = {Link} to = {`/posts?page=${item.page}`} />
      )}
    />

  )

}

export default Paginate;