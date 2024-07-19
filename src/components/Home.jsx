import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [role, setRole] = useState('');

    const defineRole = (rolee) => {
        setRole(rolee);
        localStorage.setItem('purpose', rolee);
    };

    useEffect(() => {
        const purpose = localStorage.getItem('purpose');
        setRole(purpose)
      }, []);

    return (
        <div>
            {role === '' ? (
                <>
                    <h1>Welcome to the Local Shop</h1>
                    <h2>Choose Your Role</h2>
                    <div>
                        <button onClick={() => defineRole('owner')}>As a Shop Owner</button><br />
                        <button onClick={() => defineRole('customer')}>As a Customer</button>
                    </div>
                </>
            ) : (
                role === 'owner' ? (
                    <h1>Welcome owner</h1>
                ) : (
                    <h1>Welcome customer</h1>
                )
            )}
        </div>
    );
};

export default Home;
