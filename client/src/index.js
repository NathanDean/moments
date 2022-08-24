// React + Redux
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux"
import  thunk from "redux-thunk";

// Reducers
import reducers from "./reducers";

// App
import App from "./App";

// Styling
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    
    <Provider store = {store}>

        <App />
    
    </Provider>,
    
    document.getElementById("root")
    
);