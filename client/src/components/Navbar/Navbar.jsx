// React + Redux
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

// Material UI
import { AppBar, Toolbar, Avatar, Button } from "@material-ui/core"

// Other third party
import decode from "jwt-decode";

// Constants
import { LOGOUT } from "../../constants/actionTypes";

// Styling + images
import useStyles from "./styles";
import momentsText from "../../images/momentsText.PNG";


const Navbar = () => {
  
  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // State
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // Effects
  //// Updates navbar on login/logout
  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
      
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  // Functions
  //// Used instead of Link component, see below
  const navigateToAuth = () => {
    history.push("/auth");
  }
  
  const logout = () => {
    dispatch({
      type: LOGOUT
    })

    history.push("/");

    setUser(null);
  }

  return (

    <AppBar className = {classes.appBar} position = "static" color = "inherit">

        <Link className = {classes.brandContainer} to = "/">

          <img className = {classes.image} src = {momentsText} alt = "icon" height = "40" />

        </Link>

        <Toolbar className = {classes.toolbar}>

          {user ? 
          
            (
              <div className = {classes.profile}>
                <Avatar className = {classes.purple} alt = {user.result.name} src = {user.result.picture}>
                  {user.result.name.charAt(0)}
                </Avatar>
                <Button 
                  className = {classes.logout} 
                  variant = "contained" 
                  color = "secondary" 
                  onClick = {logout}
                >Log out</Button>
              </div>
            )

          :

            (
              // Link component was directing to /posts instead of /auth
              // <Button component = {Link} to = "/auth" variant = "contained" color = "primary">Log in</Button>
              <Button  variant = "contained" color = "secondary" onClick = {navigateToAuth}>Log in</Button>
            )

          }

        </Toolbar>

    </AppBar>

  )

}

export default Navbar