import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState({email: '', password: ''});

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const login = () => {
        axios.post('http://localhost:8000/api/login', user)
            .then(res => {
                localStorage.setItem('token', res.data.access_token);
                alert(res.data.message);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <input 
                type="email" 
                name="email" 
                value={user.email} 
                onChange={handleChange} 
                placeholder="Email" 
            />
            <input 
                type="password" 
                name="password" 
                value={user.password} 
                onChange={handleChange} 
                placeholder="Password" 
            />
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;
