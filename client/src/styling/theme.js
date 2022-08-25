import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#00AAAA"
        },
        secondary: {
            main: "#3E517A"
        }
    },
    typography: {
        fontFamily: "'Outfit', sans-serif",
        h3: {
            letterSpacing: ".15rem"
        },
        h5: {
            letterSpacing: ".15rem"
        },
        h6: {
            letterSpacing: ".15rem"
        },
        body1: {
            fontSize: "1.2rem",
            letterSpacing: ".15rem"
        },
        body2: {
            letterSpacing: ".15rem"
        },
        subtitle1: {
            letterSpacing: ".15rem"
        },
        subtitle2: {
            letterSpacing: ".15rem"
        },
        button: {
            letterSpacing: ".15rem"
        }
    }
});

export default theme;