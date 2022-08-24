import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  // This isn't working
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse"
    }
  }
}));