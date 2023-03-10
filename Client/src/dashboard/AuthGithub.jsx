import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../util/alert';

const AuthGithub = () => {
    const [alert, setAlert] = useState('');
    const [danger, setDanger] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const url = `http://54.226.89.89:3000/`;

    const handleEffect = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`${url}api/user`, {
                withCredentials: true,
            });
            if (!response.data) {
                navigate('/login');
            }
            if (response.data.githubAuthToken) {
                navigate('/dashboard');
            }
        } catch (error) {
            navigate('/login');
        }
    };
    useEffect(() => {
        handleEffect();
    }, []);

    const handleCode = async () => {
        try {
            const addAuthTokenUrl = `http://54.226.89.89:3000/api/user/github`;
            axios.defaults.withCredentials = true;
            await axios(addAuthTokenUrl, {
                method: 'PUT',
                data: { code },
                withCredentials: true,
            });
            navigate('/dashboard');
        } catch (error) {
            const errorMsg = error.response.data.msg;
            if (errorMsg === 'Github token not found') {
                const refresh = () => window.location.reload(true);
                refresh();
            }
        }
    };

    if (code) {
        handleCode();

        return <Alert name={alert} showAlert={showAlert} danger={danger} />;
    }

    if (!code) {
        const handleClick = async () => {
            // redirect to github auth
            window.location.href = `https://github.com/login/oauth/authorize?client_id=e1f3fbf14b5050f6c88d&scope=repo`;
        };
        return (
            <>
                <main className="flex h-full flex-col items-center justify-center space-y-5 p-10">
                    <div className=" space-y-2 text-center">
                        <h1>Grant Access to GitHub Repositories</h1>
                        <p>
                            To analyze your code and identify vulnerabilities,
                            our app needs access to your GitHub repositories.
                        </p>
                    </div>
                    <div>
                        <h2>Once authenticated</h2>
                        <div className="ml-10 mt-2 space-y-2">
                            <p className="flex gap-2 text-sm">
                                <span>&bull;</span> Scans the directory trees of
                                repositories and automatically represents them
                                as a list
                            </p>
                            <p className="flex gap-2 text-sm">
                                <span>&bull;</span> Continuously checks imported
                                projects for vulnerabilities. When new
                                vulnerabilities are found, you'll be notified
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClick}
                        className="flex h-14 items-center justify-center gap-5 rounded-2xl bg-[#2F4F4F] px-10  font-bold text-white focus:outline-none"
                    >
                        Grant Access
                    </button>
                </main>
            </>
        );
    }
};

export default AuthGithub;
