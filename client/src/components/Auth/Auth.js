// React + Redux
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Material UI
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// Other third party
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

// Components
import Input from "./Input";

// Actions + constants
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";

// Styling
import useStyles from "./styles";

const Auth = () => {

    // Hooks
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    // State
    const initialState = {
        firstName: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    let [isSignup, setIsSignup] = useState(false);

    // Functions
    const handleSubmit = e => {
        e.preventDefault();
        
        if(isSignup){
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        };
    };

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleShowPassword = () => {setShowPassword(!showPassword)};

    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    };

    return (

        <Container component = "main" maxWidth = "xs">

            <Paper className = {classes.paper} elevation = {3}>

                <Avatar className = {classes.avatar}>

                    <LockOutlinedIcon />

                </Avatar>

                <Typography component = "h1" variant = "h5">{isSignup ? "Sign up" : "Sign in"}</Typography>

                <form className = {classes.form} onSubmit = {handleSubmit}>

                    <Grid container spacing = {2}>

                        {isSignup && (

                            <>
                            
                                <Input name = "firstName" label = "First Name" autoFocus half handleChange = {handleChange} />
                                <Input name = "surname" label = "Surname" half handleChange = {handleChange} />
                            
                            </>

                        )}
 
                        <Input name = "email" label = "Email address" type = "email" handleChange = {handleChange} />

                        <Input name = "password" label = "Password" type = {showPassword ? "text" : "password"} handleChange = {handleChange} handleShowPassword = {handleShowPassword} />

                        {isSignup && <Input name = "confirmPassword" label = "Confirm password" type = "password" handleChange = {handleChange} />}

                    </Grid>

                    <Button className = {classes.submit} type = "submit" fullWidth variant = "contained" color = "primary">{isSignup ? "Sign up" : "Sign in"}</Button>

                    {!isSignup && (

                        <GoogleLogin 
                            onSuccess = {async res => {
                                
                                const result = jwt_decode(res?.credential);
                                const token = res?.credential;

                                const data = {
                                    result: result, 
                                    token: token
                                }

                                try {

                                    dispatch({
                                        type: AUTH,
                                        payload: data
                                    })

                                    // react-router-dom object
                                    history.push("/");

                                } catch (error) {
                                    console.log(error)
                                }

                            }}
                        />

                    )}
                    


                    <Grid container justifyContent = "flex-end">

                        <Button onClick = {switchMode}>
                            {isSignup ? "Already have an account?  Sign in." : "Don't have an account?  Sign up."}
                        </Button>

                    </Grid>

                </form>

            </Paper>

        </Container>

    )

}

export default Auth;