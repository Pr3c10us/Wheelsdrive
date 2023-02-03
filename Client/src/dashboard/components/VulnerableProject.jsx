import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { IoMdBug } from 'react-icons/io';
import { MdShield } from 'react-icons/md';
import { GoAlert } from 'react-icons/go';
import SeveritiesCount from './SeveritiesCount';
import SeverityCount from './SeverityCount';
import axios from 'axios';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const VulnerableProject = ({ project, setRefresh }) => {
    const refresh = () => window.location.reload(true);
    const url = `http://52.207.191.211:3000/`;
    const navigate = useNavigate();
    const [drop, setDrop] = useState(false);
    const [active, setActive] = useState(false);

    const handleScan = async () => {
        setActive(true);
        axios.defaults.withCredentials = true;
        await axios.post(
            `${url}api/scan?repo_name=${project.repository}&clone_url=${project.clone_url}`,
            {
                withCredentials: true,
            }
        );
        setRefresh(true);
        refresh();
    };
    const handleDelete = async () => {
        const decision = window.confirm(
            'Are you sure you want to delete this project?'
        );
        if (decision) {
            setActive(true);
            axios.defaults.withCredentials = true;
            await axios.delete(`${url}api/projects/${project.repository}`, {
                withCredentials: true,
            });
            setRefresh(true);
            refresh();
        }

        return;
    };

    const totalBlocker =
        project.bugBlocker +
        project.vulnerabilityBlocker +
        project.codeSmellBlocker;
    const totalCritical =
        project.bugCritical +
        project.vulnerabilityCritical +
        project.codeSmellCritical;
    const totalMajor =
        project.bugMajor + project.vulnerabilityMajor + project.codeSmellMajor;
    const totalMinor =
        project.bugMinor + project.vulnerabilityMinor + project.codeSmellMinor;
    const totalInfo =
        project.bugInfo + project.vulnerabilityInfo + project.codeSmellInfo;
    return (
        <section className="mb-4 flex flex-col ">
            <div
                onClick={() => setDrop(!drop)}
                className="flex cursor-pointer items-center justify-between border border-gray-200 py-3 px-2 transition-all duration-500"
            >
                <div className="flex grow flex-col md:flex-row md:items-center md:gap-4">
                    <div className="mb-2 md:mb-0 ">
                        <p className="text-[0.7rem] font-bold leading-3 text-gray-400 ">
                            {project.username}
                        </p>
                        <div className="w-[150px] break-words lg:w-[200px]">
                            <h3 className="max-w-xs cursor-pointer break-words text-lg font-bold leading-5 text-[#2f4f4f] hover:text-[#2f4f4f]">
                                {project.repository}
                            </h3>
                        </div>
                    </div>
                    <SeveritiesCount
                        blocker={totalBlocker}
                        critical={totalCritical}
                        major={totalMajor}
                        minor={totalMinor}
                        info={totalInfo}
                    />
                    <p className="mx-1 hidden flex-col items-end text-right text-[0.7rem] italic leading-4 text-slate-400 lg:flex">
                        <span>Last Scanned</span>
                        {project.last_scanned}
                    </p>
                </div>
                <div className="relative ml-2 hidden items-center justify-center overflow-hidden text-4xl xs:flex">
                    <RiArrowDropUpLine
                        className={
                            drop
                                ? 'transition-all duration-500'
                                : 'absolute -translate-y-10 transition-all duration-500'
                        }
                    />
                    <RiArrowDropDownLine
                        className={
                            drop
                                ? 'absolute translate-y-10 transition-all duration-500'
                                : 'transition-all duration-500'
                        }
                    />
                </div>
            </div>
            <ul
                className={
                    drop
                        ? 'h-[340px] overflow-hidden border-b bg-gray-100 text-[#2f4f4f] transition-all duration-500 ease-in-out md:h-60'
                        : 'h-0 overflow-hidden bg-gray-100 text-[#2f4f4f] transition-all duration-500 ease-in-out'
                }
            >
                <li className="flex flex-col justify-between border-b p-4 text-lg md:flex-row md:items-center">
                    <div className="mb-1 flex items-center gap-2 md:mb-0 ">
                        <IoMdBug />
                        <Link
                            className="font-bold text-[#191970] hover:text-[#191970]"
                            to={`/dashboard/${project.repository}?type=BUG&repo_name=${project.repository}`}
                        >
                            BUG
                        </Link>
                    </div>
                    <SeverityCount
                        blocker={project.bugBlocker}
                        critical={project.bugCritical}
                        major={project.bugMajor}
                        minor={project.bugMinor}
                        info={project.bugInfo}
                    />
                </li>
                <li className="flex flex-col justify-between border-b p-4 text-lg md:flex-row md:items-center">
                    <div className="mb-1 flex items-center gap-2 md:mb-0 ">
                        <MdShield />
                        <Link
                            className="font-bold text-[#191970] hover:text-[#191970]"
                            to={`/dashboard/${project.repository}?type=VULNERABILITY&repo_name=${project.repository}`}
                        >
                            VULNERABILITY
                        </Link>
                    </div>
                    <SeverityCount
                        blocker={project.vulnerabilityBlocker}
                        critical={project.vulnerabilityCritical}
                        major={project.vulnerabilityMajor}
                        minor={project.vulnerabilityMinor}
                        info={project.vulnerabilityInfo}
                    />
                </li>
                <li className="flex flex-col justify-between p-4 text-lg md:flex-row md:items-center">
                    <div className="mb-1 flex items-center gap-2 md:mb-0">
                        <GoAlert />
                        <Link
                            className="font-bold text-[#191970] hover:text-[#191970]"
                            to={`/dashboard/${project.repository}?type=CODE_SMELL&repo_name=${project.repository}`}
                        >
                            CODE SMELL
                        </Link>
                    </div>
                    <SeverityCount
                        blocker={project.codeSmellBlocker}
                        critical={project.codeSmellCritical}
                        major={project.codeSmellMajor}
                        minor={project.codeSmellMinor}
                        info={project.codeSmellInfo}
                    />
                </li>
                <nav className="flex w-full flex-col justify-center space-y-1 border border-b-0 bg-white  py-4 px-2 nsm:flex-row">
                    {active ? (
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
                    ) : (
                        <div className="flex w-full items-center justify-center gap-8">
                            <button
                                onClick={handleDelete}
                                className="  border-none bg-inherit p-0 text-xl text-red-500 underline hover:border-none focus:outline-none "
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleScan}
                                className=" border-none bg-inherit p-0 text-xl text-[#191970] underline hover:border-none focus:outline-none active:text-[#2f4f4f] "
                            >
                                ReScan
                            </button>
                        </div>
                    )}
                </nav>
            </ul>
        </section>
    );
};

export default VulnerableProject;
