import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <div>
                <Link to='/owner'>Owner</Link>
                <Link to='/customer'>Customer</Link>
            </div>
        </div>
    )
}

export default Home