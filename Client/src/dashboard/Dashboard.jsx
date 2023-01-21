import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VulnorableProject from './components/VulnorableProject';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [issues, setIssues] = useState({});
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState([]);
    const url = 'http://localhost:3000/';

    const handleFetchData = async () => {
        try {
            axios.defaults.withCredentials = true;
            const projectsResponse = await axios.get(
                `${url}api/projects/?scanned=true`,
                {
                    withCredentials: true,
                }
            );
            const userResponse = await axios.get(`${url}api/user`, {
                withCredentials: true,
            });

            const projects = await projectsResponse.data.projects;
            const username = await userResponse.data.username;
            let issues = projects.reduce(
                (acc, project) => {
                    acc.blocked += project.blocked || 0;
                    acc.critical += project.critical || 0;
                    acc.major += project.major || 0;
                    acc.minor += project.minor || 0;
                    acc.info += project.info || 0;
                    return acc;
                },
                { blocked: 0, critical: 0, major: 0, minor: 0, info: 0 }
            );

            setData(projects);
            setUsername(username);

            setIssues(issues);

            setLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        handleFetchData();
    }, []);

    if (loading) {
        return (
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
        );
    }

    return (
        <main>
            <nav className="mb-8 flex w-full items-center space-x-3 border-b border-b-black py-4 px-3 text-sm">
                <span>{username}</span>
                <span className="text-sm">&gt;</span>
                <span>Dashboard</span>
            </nav>
            <div className="flex flex-col items-center justify-center space-y-8 pb-10 lg:flex-row lg:items-start lg:gap-8 lg:px-4">
                <div className="w-[90%]">
                    <h2 className="mb-2 underline">
                        Scanned Vulnorable Projects
                    </h2>
                    {data.map((project) => {
                        return (
                            <VulnorableProject
                                username={username}
                                repository={project.repository}
                                blocked={project.blocked}
                                critical={project.critical}
                                major={project.major}
                                minor={project.minor}
                                info={project.info}
                                name={project.name}
                                key={project.id}
                                date={project.last_scanned}
                            />
                        );
                    })}
                </div>
                <div className=" w-[90%] border border-gray-300 lg:w-auto">
                    <nav className="border-b border-b-gray-300 py-4 pl-2 text-xl font-bold ">
                        Current vulnerabilities
                    </nav>
                    <ul className="flex flex-col justify-center gap-6 bg-[#1919700a] py-4 pl-8">
                        <li className="space-y-2">
                            <p className="font-thin text-[#191970]">
                                Dangerous
                            </p>
                            <h3 className="text-3xl text-red-700 ">
                                {issues.blocked}
                            </h3>
                        </li>
                        <li className="space-y-2">
                            <p className="font-thin text-[#191970]">Critical</p>
                            <h3 className="text-3xl text-red-500">
                                {issues.critical}
                            </h3>
                        </li>
                        <li className="space-y-2">
                            <p className="font-thin text-[#191970]">High</p>
                            <h3 className="text-3xl text-orange-600">
                                {issues.major}
                            </h3>
                        </li>
                        <li className="space-y-2">
                            <p className="font-thin text-[#191970]">Medium</p>
                            <h3 className="text-3xl text-orange-400">
                                {issues.minor}
                            </h3>
                        </li>
                        <li className="space-y-2">
                            <p className="font-thin text-[#191970]">Low</p>
                            <h3 className="text-3xl text-yellow-600">
                                {issues.info}
                            </h3>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="btn mb-10 flex w-full justify-center border-none focus:outline-none ">
                <button
                    className="mt-5 flex items-center justify-center gap-5 rounded-xl bg-[#191970] px-10 py-4  font-bold text-white focus:outline-none "
                    onClick={() => navigate('/dashboard/projects')}
                >
                    Go to Projects
                </button>
            </div>
        </main>
    );
};

export default Dashboard;
