import React from 'react';
import { useState } from 'react';
import {
    useNavigate,
    BrowserRouter,
    Link,
    Routes,
    Route,
} from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
const Home = () => {
    return (
        <>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
        </>
    );
};

export default Home;
