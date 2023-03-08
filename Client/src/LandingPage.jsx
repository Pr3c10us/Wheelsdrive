import React from 'react';
import logo from './assets/wheelsdrive.svg';
import landingImage from './assets/landingPageIMage.jpg';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <main className="mx-10 flex h-screen justify-center gap-2 py-10 sm:ml-14 sm:mr-0 sm:items-center">
                <div className="flex flex-1 flex-col ">
                    <img className="mb-10 w-48" src={logo} alt="logo" />
                    <h1 className="mb-5 text-4xl font-bold text-[#2f4f4f] md:mb-3 md:flex-1 md:text-5xl lg:text-6xl ">
                        Your first line of defense against cyber threats
                    </h1>
                    <p className="text-md text-[#2f4f4f] md:text-lg">
                        Scan your code for vulnerabilities with our fast and
                        accurate tool. Protect your code and your business with
                        our easy-to-use scanning technology.
                    </p>
                    <div className="mt-10 flex space-x-3 md:space-x-6 ">
                        <button
                            className=" flex items-center justify-center border-2 border-black px-10 py-3 text-black transition-all duration-300 hover:scale-105 "
                            onClick={() => navigate('/signup')}
                        >
                            Signup
                        </button>
                        <button
                            className=" flex items-center justify-center border-none bg-[#191970] px-11 py-3 text-white transition-all duration-300 hover:scale-105 hover:border-black "
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <img
                    className="hidden  h-full w-full object-cover md:flex md:flex-1"
                    src={landingImage}
                    alt="logo"
                />
            </main>
        </>
    );
};

export default LandingPage;
