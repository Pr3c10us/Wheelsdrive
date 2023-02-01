import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Link, useOutletContext, useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('AccountSettings');
    const [active, setActive] = useOutletContext();
    const [user, setUser] = useState({});

    const handleEffect = async () => {
        setActive('settings');
        navigate(activePage);
    };

    useEffect(() => {
        handleEffect();
    }, []);

    return (
        <main className="">
            <div className=" flex flex-col">
                <nav className="flex items-center justify-center px-5">
                    <ul className="flex items-center justify-center space-x-6 p-4 nsm:text-xl">
                        <li>
                            <Link
                                onClick={() => setActivePage('Pricing')}
                                className={
                                    activePage === 'Pricing'
                                        ? 'border-b-2 border-b-black pb-1 font-bold text-[#2f4f4f] hover:text-black'
                                        : 'font-bold text-[#191970] hover:text-black'
                                }
                                to="Pricing"
                            >
                                Pricing
                            </Link>
                        </li>
                        <hr className="h-4 w-0 border border-gray-400" />
                        <li>
                            <Link
                                onClick={() => setActivePage('AccountSettings')}
                                className={
                                    activePage === 'AccountSettings'
                                        ? 'border-b-2 border-b-black pb-1 font-bold text-[#2f4f4f] hover:text-black'
                                        : 'font-bold text-[#191970] hover:text-black'
                                }
                                to="AccountSettings"
                            >
                                Account Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex-1 px-8">
                    <Outlet context={{}} />
                </div>
            </div>
        </main>
    );
};

export default Settings;
