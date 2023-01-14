import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const loginHandler = (event) => {
        setError(false);
        event.preventDefault();
        const payload = {
            email: email,
            password: password
        }

        axios.post("https://autheticate.onrender.com/login", payload).then((data, err) => {
            if (err) {
                console.log("failed");
                return;
            }
            if (data.data.exist) {
                navigate("/home");
            }
            else {
                setShowError(true);
                setError(data.data.msg);
            }
            console.log(data.data);
        });

        console.log(payload);
    }
    return (
        <>
            <h1>This is Login Page</h1>
            <label>Email: </label>
            <input type="email" value={email} onChange={(event) => {
                setEmail(event.target.value);
            }} />
            <br />
            <label>Password : </label>
            <input type="password" value={password} onChange={(event) => {
                setPassword(event.target.value);
            }} />
            <br />
            <button onClick={loginHandler}>Login</button>
            <br />
            {showError ? <p style={{color: "red"}}>{error}</p> : null}
        </>
    )
}

export default Login;

// abcde
// email => abcd
// event.target.value => abcde
// setEmail(event.target.value);