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
        } catch (error) {
            navigate('/login');
        }
    };
    useEffect(() => {
        handleEffect();
    }, []);

    if (!user.githubAuthToken) {
        navigate('/authGithub');
    }

    return (
        <main className="h-full">
            <div className="relative flex h-full ">
                <nav className="fixed h-full bg-[#2f4f4f] text-white">
                    <ul className="flex h-full flex-col items-center justify-center px-3 pb-3">
                        <div className="mb-2 w-full py-[6px]">
                            <img className="w-10" src={logo} alt="logo" />
                        </div>
                        <li
                            onClick={() => setActive('dashboard')}
                            className="mb-3 ml-3 flex w-full justify-between"
                        >
                            <Link
                                to={'/dashboard'}
                                className={
                                    active == 'dashboard'
                                        ? ' flex cursor-pointer hover:text-black items-center gap-3 text-black no-underline'
                                        : ' flex cursor-pointer hover:text-white items-center gap-3 text-white no-underline'
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
                                        ? ' flex cursor-pointer hover:text-black items-center gap-3 text-black no-underline'
                                        : ' flex cursor-pointer hover:text-white items-center gap-3 text-white no-underline'
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
                            className="mb-3 ml-3 flex w-full justify-between">
                            <Link
                                to={'/dashboard/settings'}
                                className={
                                    active == 'settings'
                                        ? ' flex cursor-pointer hover:text-black items-center gap-3 text-black no-underline'
                                        : ' flex cursor-pointer hover:text-white items-center gap-3 text-white no-underline'
                                }
                            >
                                <IoSettings className="text-3xl" />
                                <span className="hidden text-xl md:block">
                                    Settings
                                </span>
                            </Link>
                        </li>
                        <li className="mt-auto ml-3 flex w-full justify-between">
                            <Link className=" flex cursor-pointer hover:text-white items-center gap-3 text-white no-underline">
                                <IoLogOut className="text-3xl" />
                                <span className="hidden text-xl md:block">
                                    Logout
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="ml-16 h-full w-full md:ml-44 lg:ml-[177px]">
                    <Outlet />
                </div>
            </div>
        </main>
    );
};

export default Home;

// <main className=" h-full flex flex-row">
//     <div className=" relative h-full bg-[#2f4f4f] px-3">
// <div className="flex h-16 flex-col justify-center">
//     <img className=" w-10" src={logo} alt="logo" className='text-3xl' />
// </div>
//         <div className="flex flex-col">
//             <button className="flex items-center justify-center gap-4 rounded-none bg-inherit px-2 py-2 text-2xl text-white [&>p]:hidden md:[&>p]:block">
//                 <IoHome className="text-2xl text-white"  />
//                 <p>Home</p>
//             </button>
//             <button className="flex items-center justify-center gap-4 rounded-none bg-inherit px-2 py-2 text-2xl text-white [&>p]:hidden md:[&>p]:block">
//                 <IoFolder className="text-2xl text-white"  />
//                 <p>Projects</p>
//             </button>
//         </div>
//         <div className=" absolute bottom-0 flex h-16 w-full flex-col">
//             <button className="flex items-center justify-center gap-4 rounded-none bg-inherit px-2 py-2 text-2xl text-white [&>p]:hidden md:[&>p]:block">
//                 <IoLogOut className="text-2xl text-white"  />
//                 <p>Logout</p>
//             </button>
//         </div>
//     </div>
//     <div className='w-full'>
//         <Outlet  />
//     </div>
// </main>
