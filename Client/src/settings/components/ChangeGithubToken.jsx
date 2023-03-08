import React, { useState } from 'react';
import Alert from '../../util/alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangeGithubToken = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = async () => {
        const decision = window.confirm(
            'Are you sure you want to change your github account?'
        );
        if (decision) {
            setLoading(true);
            axios.defaults.withCredentials = true;
            await axios.delete(`http://localhost:3000/api/user/github`, {
                withCredentials: true,
            });
            setTimeout(() => {
                setLoading(false);
                navigate('/authGithub');
            }, 3000);
        }
        return;
    };

    return (
        <main className="my-8 flex flex-col border border-[#2f4f4f]">
            <nav className="border-b border-b-[#2f4f4f] px-4 py-5  text-black">
                <h2>
                    <span className="text-2xl font-bold">
                        Change Associated Github Account
                    </span>
                </h2>
            </nav>
            <ul className="list-disc space-y-2 p-8 text-sm xs:text-base">
                <li>
                    If you change your github account, you will lose all access
                    to repositories from your previous github account.
                </li>
                <li>
                    All Scanned and In Progress repositories would still be
                    available and you can still access them, re-scan them or
                    delete them.
                </li>
                <li>
                    If you delete a project, you will no longer be able to scan
                    them from scan page, unless you change your github account
                    back to the previous one with the deleted project
                    repository.
                </li>
            </ul>
            <div className="flex justify-center border-t border-t-[#2f4f4f] py-4 px-6">
                {loading ? (
                    <div className="flex w-full max-w-md items-center justify-center rounded-lg border-none bg-[#2f4f4f] py-3 text-sm text-white hover:border-none  hover:outline-none focus:outline-none xs:text-base sm:text-lg">
                        <div
                            role="status"
                            className="flex h-full items-center justify-center"
                        >
                            <svg
                                aria-hidden="true"
                                className="mr-2 h-8 w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
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
                    </div>
                ) : (
                    <button
                        onClick={handleChange}
                        className="w-full max-w-md border-none bg-[#2f4f4f] py-3 text-sm text-white hover:border-none hover:outline-none focus:outline-none xs:text-base sm:text-lg "
                    >
                        {' '}
                        Change Github Account
                    </button>
                )}
            </div>
        </main>
    );
};

export default ChangeGithubToken;
