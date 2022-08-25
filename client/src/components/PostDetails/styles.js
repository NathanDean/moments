import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",

  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
      flexDirection: "column-reverse",
    }
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  tags: {
    margin: "10px 0"
  },
  message: {
    margin: "15px 0"
  },
  imageSection: {
    marginLeft: "20px",
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  loadingPaper: {
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    padding: "20px", 
    borderRadius: "15px", 
    height: "39vh",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column"
  },
  commentsDisplay: {
    height: "200px",
    overflowY: "auto",
    marginRight: "auto"
  },
  leaveCommentContainer: {
    overflowY: "auto",
    marginRight: "auto",
  }
}));