import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorCard from './components/ErrorCard';
import { IoChevronUp } from 'react-icons/io5';

const Project = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const type = query.get('type');
    const url = `http://localhost:3000/`;
    const repo_name = query.get('repo_name');
    const [project, setProject] = useState({});
    const [report, setReport] = useState([]);
    const [numberOfErrors, setNumberOfErrors] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleFetch = async () => {
        axios.defaults.withCredentials = true;
        const reportResponse = await axios.get(
            `${url}api/scan?repo_name=${repo_name}&type=${type}`,
            {
                withCredentials: true,
            }
        );
        const projectResponse = await axios.get(
            `${url}api/projects/${repo_name}`,
            {
                withCredentials: true,
            }
        );
        let report = reportResponse.data.report;
        const sortOrder = {
            BLOCKER: 1,
            CRITICAL: 2,
            MAJOR: 3,
            MINOR: 4,
            INFO: 5,
        };
        report.sort((a, b) => {
            return sortOrder[a.severity] - sortOrder[b.severity];
        });
        setProject(projectResponse.data);
        setReport(report);
        setNumberOfErrors(reportResponse.data.report.length);
        setLoading(false);
    };

    useEffect(() => {
        handleFetch();
    }, []);

    if (loading) {
        return (
            <div
                role="status"
                className="flex h-full items-center justify-center"
            >
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
        );
    }

    if (numberOfErrors === 0) {
        return (
            <div className="mt-64 flex flex-col items-center justify-center">
                <p> You have no {type} issues in this project</p>
                <button
                    onClick={() => {
                        navigate('/dashboard');
                    }}
                    className="   border-none bg-inherit text-black underline duration-100 hover:border-none hover:text-black hover:outline-none focus:outline-none "
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <main className="h-full ">
            <div className="flex h-full flex-col items-center">
                <div id="top"></div>
                <nav className="sticky top-0 z-40 w-full border-b border-b-black bg-white p-4 text-[#2f4f4f]">
                    <h3 className="text-lg">{type} ISSUES</h3>
                    <h2 className=" text-3xl font-bold">{repo_name}</h2>
                </nav>
                <div className="flex w-full items-center justify-between gap-2 border-b-2 py-4 pr-8 pl-4 font-bold">
                    <div className="text-sm">
                        <p className="font-thin italic text-black">
                            Last Scanned
                        </p>
                        {project.last_scanned}
                    </div>
                    <button
                        onClick={() => {
                            navigate('/dashboard');
                        }}
                        className="border-2 border-[#2f4f4f] text-[#2f4f4f] duration-100 hover:border-[#2f4f4f] hover:text-[#2f4f4f] hover:outline-none focus:outline-none "
                    >
                        Back
                    </button>
                </div>
                <ul className="mb-14 mt-4 w-full px-4 ">
                    <p className="mb-2 -translate-x-2 text-sm font-bold text-red-600">
                        {numberOfErrors}
                        <span> Issues</span>{' '}
                    </p>
                    {report.map((item) => {
                        return <ErrorCard error={item} key={item.key} />;
                    })}
                </ul>
                <a
                    href="#top"
                    className="fixed bottom-20 right-0 rounded-full bg-gray-300 p-1 text-3xl text-black hover:text-black"
                >
                    <IoChevronUp />
                </a>
            </div>
        </main>
    );
};

export default Project;
