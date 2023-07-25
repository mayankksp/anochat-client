// anochat-client/src/components/Register.js
'use client';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation'; // Corrected the import statement

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user, loading, register } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if(user) router.push('/profile');
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(username, password);
    };

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} value={username} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;