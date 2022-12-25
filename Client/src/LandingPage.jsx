import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <main className="mx-10  flex h-screen justify-center py-10 sm:mx-14 sm:items-center">
                <div className="flex flex-1 flex-col ">
                    <div className="mb-10 h-10 w-10 bg-[#000080]"></div>
                    <h1 className="mb-5 text-4xl font-bold md:mb-3 md:flex-1 md:text-6xl ">
                        Your first line of defense against cyber threats
                    </h1>
                    <p className="text-md md:text-lg">
                        Scan your code for vulnerabilities with our fast and
                        accurate tool. Protect your code and your business with
                        our easy-to-use scanning technology.
                    </p>
                    <div className="mt-10 flex space-x-3 md:space-x-6 ">
                        <button
                            className="md:min-w-1/2 h-10 w-28 border-none bg-[#191970] text-white transition-all duration-300 md:h-14 md:w-40 "
                            onClick={() => navigate('/signup')}
                        >
                            Signup
                        </button>
                        <button
                            className="md:min-w-1/2 h-10 w-28 border-none bg-[#2F4F4F] text-white transition-all duration-300 md:h-14 md:w-40 "
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className="hidden md:block md:flex-1"></div>
            </main>
        </>
    );
};

export default LandingPage;
