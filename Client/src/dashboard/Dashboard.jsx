import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Title.svg';
import { IoHome, IoFolder, IoLogOut } from 'react-icons/io5';

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [githubToken, setGithubToken] = useState('');
    const url = 'http://localhost:3000/';
    const handleEffect = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`${url}api/user`, {
                withCredentials: true,
            });

            setUsername(await response.data.username);
            setGithubToken(await response.data.githubAuthToken);
        } catch (error) {
            navigate('/login');
        }
    };
    useEffect(() => {
        handleEffect();
    }, []);

    if (!githubToken) {
        navigate('/authGithub');
    }

    return (
        <main className=" flex flex-row">
            <div className=" relative h-screen bg-[#2f4f4f] px-3">
                <div className="flex h-16 flex-col justify-center">
                    <img className=" w-10" src={logo} alt="logo" />
                </div>
                <div className="flex flex-col">
                    <button className="flex items-center gap-4 rounded-none bg-inherit px-2 py-2 text-2xl text-white [&>p]:hidden md:[&>p]:block">
                        <IoHome className="text-2xl text-white" />
                        <p>Home</p>
                    </button>
                    <button className="flex items-center gap-4 rounded-none bg-inherit px-2 py-2 text-2xl text-white [&>p]:hidden md:[&>p]:block">
                        <IoFolder className="text-2xl text-white" />
                        <p>Projects</p>
                    </button>
                </div>
                <div className=" absolute bottom-0 flex h-16 w-full flex-col">
                    <button className="flex items-center gap-4 rounded-none bg-inherit px-2 py-2 text-2xl text-white [&>p]:hidden md:[&>p]:block">
                        <IoLogOut className="text-2xl text-white" />
                        <p>Logout</p>
                    </button>
                </div>
            </div>
            <div></div>
        </main>
    );
};

export default Dashboard;
