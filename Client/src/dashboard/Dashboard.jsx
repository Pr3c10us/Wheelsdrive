import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VulnerableProject from './components/VulnerableProject';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ProjectInProgress from './components/ProjectInProgress';

const Dashboard = () => {
    const navigate = useNavigate();
    const [scannedProject, setScannedProject] = useState([]);
    const [projectsInProgress, setProjectsInProgress] = useState([]);
    const [issues, setIssues] = useState({});
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useOutletContext();
    const [refresh, setRefresh] = useState(false);

    const url = `http://54.226.89.89:3000/`;

    const handleFetchData = async () => {
        setActive('dashboard');
        axios.defaults.withCredentials = true;
        const projectsResponse = await axios.get(`${url}api/projects/`, {
            withCredentials: true,
        });
        const projects = await projectsResponse.data.projects;
        if (!projects.length) {
            setLoading(false);
            return;
        }

        const scannedProject = projects.filter(
            (project) => project.scan_status === 'done'
        );
        const projectsInProgress = projects.filter(
            (project) => project.scan_status === 'in-progress'
        );

        let issues = scannedProject.reduce(
            (acc, project) => {
                acc.blocked += project.bugBlocker || 0;
                acc.blocked += project.vulnerabilityBlocker || 0;
                acc.blocked += project.codeSmellBlocker || 0;
                acc.critical += project.bugCritical || 0;
                acc.critical += project.vulnerabilityCritical || 0;
                acc.critical += project.codeSmellCritical || 0;
                acc.major += project.bugMajor || 0;
                acc.major += project.vulnerabilityMajor || 0;
                acc.major += project.codeSmellMajor || 0;
                acc.minor += project.bugMinor || 0;
                acc.minor += project.vulnerabilityMinor || 0;
                acc.minor += project.codeSmellMinor || 0;
                acc.info += project.bugInfo || 0;
                acc.info += project.vulnerabilityInfo || 0;
                acc.info += project.codeSmellInfo || 0;
                return acc;
            },
            { blocked: 0, critical: 0, major: 0, minor: 0, info: 0 }
        );
        setScannedProject(scannedProject);
        setProjectsInProgress(projectsInProgress);

        setIssues(issues);

        setLoading(false);
    };

    // use useEffect to fetch data when page loads and when the user clicks on the rescan button
    useEffect(() => {
        handleFetchData();
    }, [refresh]);

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

    if (scannedProject.length === 0 && projectsInProgress.length === 0) {
        return (
            <div className="mt-32 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-gray-500 dark:text-gray-400">
                    You have no projects
                </h1>
                <button
                    className="mt-4 rounded-md bg-[#2f4f4f] px-4 py-2 text-white hover:bg-gray-600"
                    onClick={() => navigate('/dashboard/repos')}
                >
                    Add Project
                </button>
            </div>
        );
    }

    return (
        <main>
            <div className="mx-4 mt-8 flex flex-col items-center justify-center space-y-8 pb-10 lg:flex-row lg:items-start lg:gap-8 lg:px-4">
                <div className="w-full">
                    <div className="w-full">
                        {scannedProject.length > 0 ? (
                            <>
                                <h2 className="mb-2 text-xl text-[#2f4f4f] underline">
                                    Scanned Projects
                                </h2>
                                {scannedProject.map((project) => {
                                    return (
                                        <VulnerableProject
                                            project={project}
                                            key={project.id}
                                            setRefresh={setRefresh}
                                        />
                                    );
                                })}
                                <div className="sticky bottom-0 flex w-full items-center justify-center border-t-2 bg-white py-3 px-2">
                                    {/* <nav className="sticky bottom-0 flex w-full flex-col justify-center space-y-1 border-t bg-white  py-3 px-2 nsm:flex-row"> */}

                                    <button
                                        className="my-2 rounded-lg border-none bg-[#2f4f4f] px-4 py-2  text-white hover:outline-none focus:outline-none "
                                        onClick={() =>
                                            navigate('/dashboard/repos')
                                        }
                                    >
                                        Add Project
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="mb-2 text-xl text-[#2f4f4f] underline">
                                    Scanned Projects
                                </h2>
                                <h2 className="m-4 text-xl">
                                    No Scanned Project
                                </h2>
                                <div className="sticky bottom-0 flex w-full items-center justify-center border-t-2 bg-white py-3 px-2">
                                    <button
                                        className="my-2 rounded-lg border-none bg-[#2f4f4f] px-4 py-2  text-white hover:outline-none focus:outline-none "
                                        onClick={() =>
                                            navigate('/dashboard/repos')
                                        }
                                    >
                                        Add Project
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="w-full">
                        <h2 className="mb-2 text-xl text-[#2f4f4f] underline">
                            Projects in Progress
                        </h2>
                        {projectsInProgress.length > 0 ? (
                            <>
                                {projectsInProgress.map((project) => {
                                    return (
                                        <ProjectInProgress
                                            project={project}
                                            key={project.id}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <h2 className="m-4 text-xl">
                                No Projects in Progress
                            </h2>
                        )}
                    </div>
                </div>
                <div className=" w-[90%] border border-gray-300 lg:sticky lg:top-12 lg:w-auto">
                    <nav className="border-b border-b-gray-300 py-4 pl-2 text-xl font-bold text-[#2f4f4f] ">
                        Current vulnerabilities
                    </nav>
                    <ul className="flex flex-col justify-center gap-6 bg-[#2f4f4f07] py-4 pl-8">
                        <li className="space-y-2">
                            <p className="font-thin text-[#191970]">
                                Dangerous
                            </p>
                            <h3 className="text-3xl text-red-600 ">
                                {issues.blocked}
                            </h3>
                        </li>
                        <li className="space-y-2">
                            <p className="font-thin text-[#191970]">Critical</p>
                            <h3 className="text-3xl text-orange-600">
                                {issues.critical}
                            </h3>
                        </li>
                        <li className="space-y-2">
                            <p className="font-thin text-[#191970]">High</p>
                            <h3 className="text-3xl text-orange-400">
                                {issues.major}
                            </h3>
                        </li>
                        <li className="space-y-2">
                            <p className="font-thin text-[#191970]">Medium</p>
                            <h3 className="text-3xl text-yellow-500">
                                {issues.minor}
                            </h3>
                        </li>
                        <li className="space-y-2">
                            <p className="font-thin text-[#191970]">Low</p>
                            <h3 className="text-3xl text-gray-600">
                                {issues.info}
                            </h3>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
