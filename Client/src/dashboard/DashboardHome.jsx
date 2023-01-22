import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import logo from '../assets/Title.svg';
import { IoHome, IoFolder, IoLogOut, IoSettings } from 'react-icons/io5';

const Home = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [active, setActive] = useState('dashboard');
    const [user, setUser] = useState({});
    const url = 'http://localhost:3000/';

    const handleEffect = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`${url}api/user`, {
                withCredentials: true,
            });
            setUser(await response.data);
            if (!response.data.githubAuthToken) {
                navigate('/authGithub');
            }
        } catch (error) {
            navigate('/login');
        }
    };
    useEffect(() => {
        handleEffect();
    }, []);

    return (
        <main className="h-full">
            <div className="relative flex h-full">
                <nav
                    onMouseOver={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={
                        isHovered
                            ? 'fixed h-full w-44 overflow-hidden bg-[#2f4f4f] text-white transition-all duration-300 md:w-44'
                            : 'fixed h-full w-16 overflow-hidden bg-[#2f4f4f] text-white transition-all duration-300 md:w-44'
                    }
                >
                    <ul className="flex h-full flex-col items-center justify-center px-3 pb-3">
                        <div className="mb-2 w-full py-[6px]">
                            <img className="w-10" src={logo} alt="logo" />
                        </div>
                        <li
                            onClick={() => {
                                navigate('/dashboard');
                                setActive('dashboard');
                            }}
                            className="mb-3 ml-1 flex w-full justify-between text-xl"
                        >
                            <div
                                className={
                                    active == 'dashboard'
                                        ? 'flex w-[152px] cursor-pointer items-center gap-3 border p-1  text-black no-underline transition-all duration-200 hover:text-black'
                                        : 'flex cursor-pointer items-center gap-3 p-1  text-white no-underline transition-colors duration-200 hover:text-gray-300'
                                }
                            >
                                <IoHome className="text-3xl" />
                                <span
                                    md:block
                                    className={
                                        isHovered ? 'block' : 'hidden md:block'
                                    }
                                >
                                    Dashboard
                                </span>
                            </div>
                        </li>

                        <li
                            onClick={() => {
                                navigate('/dashboard/settings');
                                setActive('settings');
                            }}
                            className="mb-3 ml-1 flex w-full justify-between text-xl"
                        >
                            <div
                                className={
                                    active == 'settings'
                                        ? 'flex w-[152px] cursor-pointer items-center gap-3 border p-1  text-black no-underline transition-all duration-200 hover:text-black'
                                        : 'flex cursor-pointer items-center gap-3 p-1  text-white no-underline transition-colors duration-200  hover:text-gray-300'
                                }
                            >
                                <IoSettings className="text-3xl" />
                                <span
                                    md:block
                                    className={
                                        isHovered ? 'block' : 'hidden md:block'
                                    }
                                >
                                    Settings
                                </span>
                            </div>
                        </li>
                        <li className="mt-auto ml-1 flex w-full justify-between text-xl">
                            <Link
                                className={
                                    active == 'logout'
                                        ? 'flex cursor-pointer items-center gap-3 border p-1 text-black  no-underline transition-all duration-200 hover:text-black'
                                        : 'flex cursor-pointer items-center gap-3 p-1  text-white no-underline transition-colors duration-200 hover:text-gray-300'
                                }
                            >
                                <IoLogOut className="text-3xl" />
                                <span
                                    md:block
                                    className={
                                        isHovered ? 'block' : 'hidden md:block'
                                    }
                                >
                                    Logout
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="ml-16 w-full md:ml-44 lg:ml-[177px]">
                    <nav className="flex w-full items-center space-x-3 border-b border-b-black bg-slate-200 py-4 px-3 text-sm font-bold text-[#2f4f4f]">
                        <span className=" capitalize">
                            {user.username || 'username'}
                        </span>
                        <span className="text-sm">&gt;</span>
                        <span className=" capitalize">{active || ''}</span>
                    </nav>
                    <Outlet context={[active, setActive]} />
                </div>
            </div>
        </main>
    );
};

export default Home;
