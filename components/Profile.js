// anochat-client/src/components/Profile.js
'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Corrected the import statement
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if(!user) router.push('/login');
    }, [user]);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <div>
                <h1>{user && user.username}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;