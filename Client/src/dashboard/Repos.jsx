import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoLogoGithub, IoSearch } from 'react-icons/io5';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { RxCross1 } from 'react-icons/rx';

const Repos = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(false);
    const [isSelected, setIsSelected] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const url = 'http://localhost:3000/';

    const handleEffect = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${url}api/user`, {
            withCredentials: true,
        });
        const repositories = await axios.get(
            `${url}api/projects/getRepositories/${response.data.githubAuthToken}`,
            {
                withCredentials: true,
            }
        );
        setRepos(await repositories.data.repositories);
        setLoading(false);
    };

    const handleSearch = async () => {
        setLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${url}api/user`, {
            withCredentials: true,
        });
        let repositories;
        if (searchQuery === '') {
            repositories = await axios.get(
                `${url}api/projects/getRepositories/${response.data.githubAuthToken}`,
                {
                    withCredentials: true,
                }
            );
        }
        if (searchQuery !== '') {
            repositories = await axios.get(
                `${url}api/projects/repositories/${response.data.githubAuthToken}?search_query=${searchQuery}`,
                {
                    withCredentials: true,
                }
            );
        }
        setRepos(await repositories.data.repositories);
        setSelected(false);
        setIsSelected('');
        setLoading(false);
    };

    const handleCancel = async () => {
        setLoading(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${url}api/user`, {
            withCredentials: true,
        });
        let repositories;
        repositories = await axios.get(
            `${url}api/projects/getRepositories/${response.data.githubAuthToken}`,
            {
                withCredentials: true,
            }
        );
        setRepos(await repositories.data.repositories);
        setSelected(false);
        setIsSelected('');
        setLoading(false);
    };

    useEffect(() => {
        handleEffect();
    }, []);

    return (
        <main>
            <div className="flex flex-col items-center px-2">
                <div className="mt-4 flex w-[70%] justify-between rounded-3xl border border-gray-500">
                    <input
                        placeholder={searchQuery}
                        onChange={(e) => {
                            e.preventDefault();
                            setSearchQuery(e.target.value);
                        }}
                        type="text"
                        className="m-0 w-full rounded-l-3xl p-0 pl-5 text-xl focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className=" rounded-r-none rounded-l-none border-x border-y-0 border-x-black  bg-inherit px-4 py-1 hover:border-y-0 hover:border-x-black hover:bg-gray-200  focus:outline-none "
                    >
                        <CiSearch className="text-3xl text-gray-500 " />
                    </button>
                    <button
                        onClick={handleCancel}
                        className=" rounded-r-3xl rounded-l-none border-none bg-inherit  px-5 py-1 hover:border-none hover:bg-gray-300 focus:outline-none "
                    >
                        <RxCross1 />
                    </button>
                </div>
                <div className="my-4 flex w-full items-center justify-center gap-3 p-2 text-center nsm:text-left">
                    <span className="break-words text-xl font-bold text-[#2f4f4f]">
                        Which GitHub repositories do you want to Scan?
                    </span>
                </div>
                {loading ? (
                    <div
                        role="status"
                        className="flex h-full items-center justify-center"
                    >
                        <svg
                            aria-hidden="true"
                            className="mr-2 h-8 w-8 animate-spin fill-gray-500 text-gray-200 dark:text-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <>
                        {repos.length > 0 ? (
                            <div className="grid w-full mb-8 grid-cols-1  gap-4 nsm:grid-cols-2 lg:grid-cols-3">
                                {repos.map((repo) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                setSelected(true);
                                                setIsSelected(repo.name);
                                            }}
                                            className={
                                                isSelected === repo.name
                                                    ? ' mb-2 flex cursor-pointer items-center justify-start gap-3 rounded-md border-2 border-black bg-[#2f4f4f43] p-2 transition-all duration-150'
                                                    : ' o mb-2 flex cursor-pointer items-center justify-start gap-3 rounded-md border-2 p-2 transition-all duration-150 hover:bg-[#2f4f4f10]'
                                            }
                                        >
                                            <IoLogoGithub
                                                className={
                                                    isSelected === repo.name
                                                        ? 'rounded-full bg-[#2f4f4f] text-2xl text-white'
                                                        : 'text-2xl'
                                                }
                                            />
                                            <span className="w-[80%] break-words">
                                                {repo.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex w-full items-center justify-center gap-3 m-8 p-2 text-center nsm:text-left">
                                <span className="break-words text-3xl font-bold text-[#2f4f4f]">
                                    No Repositories Found
                                </span>
                            </div>
                        )}
                        <nav className="sticky bottom-0 flex w-full flex-col justify-center space-y-1 border-t bg-white  py-3 px-2 nsm:flex-row">
                            <div className="flex w-full items-center justify-center gap-3 ">
                                <button
                                    onClick={() => {
                                        navigate('/dashboard');
                                    }}
                                    className="border-2 border-black bg-slate-200 text-black hover:outline-none focus:outline-none "
                                >
                                    Cancel
                                </button>
                                <button
                                    className={
                                        selected
                                            ? 'border-none bg-[#2f4f4f] text-white hover:outline-none focus:outline-none '
                                            : 'cursor-not-allowed border-none bg-gray-300 text-white hover:outline-none focus:outline-none '
                                    }
                                >
                                    Scan Repository
                                </button>
                            </div>
                        </nav>
                    </>
                )}
            </div>
        </main>
    );
};

export default Repos;
