import React, { useState, useEffect } from 'react';
import Owner from './Owner'
import Customer from './Customer'
import { useSelector } from 'react-redux';

const Home = () => {
    // const role = useSelector((state) => state.userData.role)
    const role = localStorage.getItem("role")
    return (
        <div>
            {role === 'Owner' ? (
                    <Owner />
                ) : role==='Customer'? (
                    <Customer/>
                ):(
                    <div><h1>Choose a role</h1></div>
                )
            }
        </div>
    );
};

export default Home;
