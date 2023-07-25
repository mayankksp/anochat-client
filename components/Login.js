// anochat-client/src/components/Login.js
'use client';
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // corrected the import statement
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user, loading, login } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if(user) router.push('/profile');
      }, [user]);      

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} value={username} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
