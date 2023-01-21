import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import logo from '../assets/Title.svg';
import { IoHome, IoFolder, IoLogOut, IoSettings } from 'react-icons/io5';

const Home = () => {
    const navigate = useNavigate();
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
            <div className="relative flex h-full ">
                <nav className="fixed h-full bg-[#2f4f4f] text-white">
                    <ul className="flex h-full flex-col items-center justify-center px-3 pb-3">
                        <div className="mb-2 w-full py-[6px]">
                            <img className="w-10" src={logo} alt="logo" />
                        </div>
                        <li
                            onClick={() => setActive('')}
                            className="mb-3 ml-3 flex w-full justify-between"
                        >
                            <Link
                                to={'/dashboard'}
                                className={
                                    active == 'dashboard'
                                        ? ' flex cursor-pointer items-center gap-3 text-black no-underline hover:text-black'
                                        : ' flex cursor-pointer items-center gap-3 text-white no-underline hover:text-white'
                                }
                            >
                                <IoHome className="text-3xl" />
                                <span className="hidden text-xl md:block">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li
                            onClick={() => setActive('projects')}
                            className="mb-3 ml-3 flex w-full justify-between"
                        >
                            <Link
                                to={'/dashboard/projects'}
                                className={
                                    active == 'projects'
                                        ? ' flex cursor-pointer items-center gap-3 text-black no-underline hover:text-black'
                                        : ' flex cursor-pointer items-center gap-3 text-white no-underline hover:text-white'
                                }
                            >
                                <IoFolder className="text-3xl" />
                                <span className="hidden text-xl md:block">
                                    Projects
                                </span>
                            </Link>
                        </li>
                        <li
                            onClick={() => setActive('settings')}
                            className="mb-3 ml-3 flex w-full justify-between"
                        >
                            <Link
                                to={'/dashboard/settings'}
                                className={
                                    active == 'settings'
                                        ? ' flex cursor-pointer items-center gap-3 text-black no-underline hover:text-black'
                                        : ' flex cursor-pointer items-center gap-3 text-white no-underline hover:text-white'
                                }
                            >
                                <IoSettings className="text-3xl" />
                                <span className="hidden text-xl md:block">
                                    Settings
                                </span>
                            </Link>
                        </li>
                        <li className="mt-auto ml-3 flex w-full justify-between">
                            <Link className=" flex cursor-pointer items-center gap-3 text-white no-underline hover:text-white">
                                <IoLogOut className="text-3xl" />
                                <span className="hidden text-xl md:block">
                                    Logout
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="ml-16 h-full w-full md:ml-44 lg:ml-[177px]">
                    <nav className="mb-8 flex w-full items-center space-x-3 border-b border-b-black py-4 px-3 text-sm font-bold text-[#2f4f4f]">
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
