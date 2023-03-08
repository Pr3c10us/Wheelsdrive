import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import logo from '../assets/Title.svg';
import { IoHome, IoLogOut, IoSettings } from 'react-icons/io5';
import { IoMdAddCircle } from 'react-icons/io';
const Home = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [active, setActive] = useState('dashboard');
    const [user, setUser] = useState({});
    const [firstLetter, setFirstLetter] = useState('');
    const url = `http://3.85.17.146:3000/`;

    const handleEffect = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`${url}api/user`, {
                withCredentials: true,
            });
            setUser(await response.data);
            setFirstLetter(
                await response.data.username.charAt(0).toUpperCase()
            );
            // send error if no user
            if (!response.data) {
                throw new Error('No user');
            }
            if (!response.data.githubAuthToken) {
                navigate('/authGithub');
            }
        } catch (error) {
            axios.defaults.withCredentials = true;
            axios.get(`${url}api/auth/logout`, {
                withCredentials: true,
            });
            navigate('/login');
        }
    };
    useEffect(() => {
        handleEffect();
    }, [active]);

    return (
        <main className="h-full">
            <div className="relative flex h-full">
                <nav
                    onMouseOver={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={
                        isHovered
                            ? 'fixed z-50 h-full w-52 overflow-hidden bg-[#2f4f4f] text-white transition-all duration-300 md:w-52'
                            : 'fixed z-50 h-full w-16 overflow-hidden bg-[#2f4f4f] text-white transition-all duration-300 md:w-52'
                    }
                >
                    <ul className="flex h-full flex-col  items-center  justify-center px-[10px] pb-3">
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
                                    active.includes('dashboard')
                                        ? 'flex w-full cursor-pointer items-center gap-3 border p-1  text-black no-underline transition-all duration-200 hover:text-black'
                                        : 'flex w-full cursor-pointer items-center gap-3 p-1  text-white no-underline transition-colors duration-200 hover:text-gray-300'
                                }
                            >
                                <div>
                                    <IoHome className="text-3xl" />
                                </div>
                                <span
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
                                navigate('/dashboard/repos');
                                setActive('Scan');
                            }}
                            className="mb-3 ml-1 flex w-full justify-between text-xl"
                        >
                            <div
                                className={
                                    active.includes('Scan')
                                        ? 'flex  w-full cursor-pointer items-center gap-3 border p-1  text-black no-underline transition-all duration-200 hover:text-black'
                                        : 'flex  w-full cursor-pointer items-center gap-3 p-1  text-white no-underline transition-colors duration-200 hover:text-gray-300'
                                }
                            >
                                <div>
                                    <IoMdAddCircle className="text-3xl" />
                                </div>
                                <span
                                    className={
                                        isHovered
                                            ? ' block'
                                            : 'hidden  md:block'
                                    }
                                >
                                    Scan
                                </span>
                            </div>
                        </li>
                        <li
                            onClick={() => {
                                navigate('/dashboard/settings/');
                                setActive('settings');
                            }}
                            className="mb-3 ml-1 flex w-full justify-between text-xl"
                        >
                            <div
                                className={
                                    active == 'settings'
                                        ? 'flex  w-full cursor-pointer items-center gap-3 border p-1  text-black no-underline transition-all duration-200 hover:text-black'
                                        : 'flex  w-full cursor-pointer items-center gap-3 p-1  text-white no-underline transition-colors duration-200  hover:text-gray-300'
                                }
                            >
                                <div>
                                    <IoSettings className="text-3xl" />
                                </div>
                                <span
                                    className={
                                        isHovered
                                            ? ' block'
                                            : 'hidden  md:block'
                                    }
                                >
                                    Settings
                                </span>
                            </div>
                        </li>
                        <li
                            onClick={() => {
                                setTimeout(() => {
                                    axios.defaults.withCredentials = true;
                                    axios.get(`${url}api/auth/logout`, {
                                        withCredentials: true,
                                    });
                                    navigate('/login');
                                }, 1000);
                            }}
                            className="mt-auto ml-1 flex w-full justify-between text-xl"
                        >
                            <Link
                                className={
                                    active == 'logout'
                                        ? 'flex  w-full cursor-pointer items-center gap-3 border p-1 text-black  no-underline transition-all duration-200 hover:text-black'
                                        : 'flex  w-full cursor-pointer items-center gap-3 p-1  text-white no-underline transition-colors duration-200 hover:text-gray-300'
                                }
                            >
                                <div>
                                    <IoLogOut className="text-3xl" />
                                </div>
                                <span
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
                <div className="ml-16 w-full md:ml-52 lg:ml-52">
                    <nav className="sticky top-0 z-40 flex w-full items-center justify-between space-x-2 bg-[#2f4f4f43] py-4 px-3 pr-8 text-sm font-bold text-[#2f4f4f] backdrop-blur-sm">
                        <div className="space-x-2">
                            <span className=" capitalize">
                                {user.username || 'username'}
                            </span>
                            <span>&gt;</span>
                            <span className=" capitalize">{active || ''}</span>
                        </div>
                        {/* <div
                            onClick={() => {
                                navigate('/dashboard/settings/');
                            }}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#191970] font-light text-white sm:h-10 sm:w-10 sm:text-2xl "
                        >
                            {firstLetter}
                        </div> */}
                    </nav>
                    <Outlet context={[active, setActive]} />
                </div>
            </div>
        </main>
    );
};

export default Home;
