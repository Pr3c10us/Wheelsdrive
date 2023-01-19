import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './login/Login';
import Signup from './signup/Signup';
import Dashboard from './dashboard/Dashboard';
import OTP from './login/OTP';
import AuthGithub from './dashboard/authGithub';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/authGithub',
        element: <AuthGithub />,
    },
    { path: '/otp/:username', element: <OTP /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
