import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({
        name: '', 
        email: '', 
        password: ''
    });

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const register = () => {
        axios.post('http://localhost:8000/api/register', user)
            .then(res => {
                alert(res.data.message);
            })
            .catch(err => {
                console.log(err);
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    alert(err.response.data.message);
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                    alert("No response from server");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                    alert(err.message);
                }
            })
    }

    return (
        <div className="register">
            <h2>Register</h2>
            <input 
                type="text" 
                name="name" 
                value={user.name} 
                onChange={handleChange} 
                placeholder="Name" 
            />
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
            <button onClick={register}>Register</button>
        </div>
    );
}

export default Register;
