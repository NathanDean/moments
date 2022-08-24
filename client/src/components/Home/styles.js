import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'center',
    padding: '16px',
    textAlign: "center"
  },
  input: {
    margin: "5px 0"
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));