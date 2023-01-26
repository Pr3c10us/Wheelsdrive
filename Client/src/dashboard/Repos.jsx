import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoLogoGithub } from 'react-icons/io5';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { RxCross1 } from 'react-icons/rx';

const Repos = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(false);
    const [isSelected, setIsSelected] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [active, setActive, user] = useOutletContext();
    const navigate = useNavigate();
    const url = 'http://localhost:3000/';

    const handleEffect = async () => {
        setActive('dashboard > Add Project');
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
    const handleScan = async () => {
        if (isSelected === '' || selected === false) {
            return;
        }
        setSelected(false);
        setLoading(true);
        const repo = repos.filter((repo) => repo.name === isSelected);
        axios.defaults.withCredentials = true;
        await axios.post(
            `${url}api/scan?repo_name=${repo[0].name}&clone_url=${repo[0].clone_url}`,
            {
                withCredentials: true,
            }
        );
        navigate('/dashboard');
    };
    useEffect(() => {
        handleEffect();
    }, []);
    // console.log(repos);

    return (
        <main>
            <div className="flex flex-col items-center px-2">
                <div className="mt-6 flex w-full items-center justify-center gap-2">
                    <div className="flex max-w-[80%] lg:max-w-[50%] flex-1 justify-between rounded border border-gray-500">
                        <input
                            placeholder={searchQuery}
                            onChange={(e) => {
                                e.preventDefault();
                                setSearchQuery(e.target.value);
                            }}
                            type="text"
                            className="m-0 w-full rounded-l border-r border-r-black p-0 pl-2 text-lg focus:outline-none md:text-xl"
                        />
                        <button
                            onClick={handleSearch}
                            className=" rounded-r rounded-l-none border-none   bg-inherit px-3 py-1 hover:border-none focus:outline-none  md:px-4 "
                        >
                            <CiSearch className="text-lg text-gray-500 md:text-3xl " />
                        </button>
                    </div>
                    <button
                        onClick={handleCancel}
                        className="rounded-md bg-inherit px-3 py-1 hover:border-none hover:text-red-500 focus:outline-none border-none md:px-4"
                    >
                        <RxCross1 className="text-lg text-gray-500 md:text-2xl " />
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
                        className="flex h-full flex-col items-center justify-center"
                    >
                        <div className="mt-8">
                            <svg
                                aria-hidden="true"
                                className="mr-2 h-8 w-8 animate-spin fill-[#2f4f4f] text-gray-200 dark:text-gray-600"
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
                        <nav className="fixed bottom-0 flex w-full flex-col justify-center space-y-1 border-t bg-white  py-3 px-2 nsm:flex-row">
                            <div className="flex w-full items-center justify-center gap-3 ">
                                <button
                                    onClick={() => {
                                        navigate('/dashboard');
                                    }}
                                    className="border-2 border-black bg-slate-200  text-black duration-100 hover:border-red-500 hover:text-red-500 hover:outline-none focus:outline-none "
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleScan}
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
                    </div>
                ) : (
                    <>
                        {repos.length > 0 ? (
                            <div className="mb-8 grid w-full grid-cols-1  gap-4 nsm:grid-cols-2 lg:grid-cols-3">
                                {repos.map((repo) => {
                                    return (
                                        <div
                                            key={repo.name}
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
                            <div className="m-8 flex w-full items-center justify-center gap-3 p-2 text-center nsm:text-left">
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
                                    className="border-2 border-black bg-slate-200  text-black duration-100 hover:border-black hover:text-black hover:outline-none focus:outline-none "
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleScan}
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
