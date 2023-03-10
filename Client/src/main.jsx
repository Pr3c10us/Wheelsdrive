import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './login/Login';
import Signup from './signup/Signup';
import Home from './dashboard/DashboardHome';
import OTP from './login/OTP';
import AuthGithub from './dashboard/AuthGithub';
import Dashboard from './dashboard/Dashboard';
import Project from './dashboard/Project';
import Settings from './settings/Settings';
import Pricing from './settings/Pricing';
import AccountSettings from './settings/AccountSettings';
import Repos from './dashboard/Repos';

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
        element: <Home />,
        children: [
            {
                path: '',
                element: <Dashboard />,
            },
            {
                path: ':project',
                element: <Project />,
            },
            {
                path: 'repos',
                element: <Repos />,
            },
            {
                path: 'settings',
                element: <Settings />,
                children: [
                    {
                        path: 'Pricing',
                        element: <Pricing />,
                    },
                    {
                        path: '',
                        element: <AccountSettings />,
                    },
                ],
            },
        ],
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
