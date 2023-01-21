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
import Project from './dashboard/project';
import Settings from './dashboard/settings';
import Projects from './dashboard/Projects';

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
                path: 'settings',
                element: <Settings />,
            },
            {
                path: 'projects',
                element: <Projects/>
            }
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
