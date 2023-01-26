import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { IoMdBug } from 'react-icons/io';
import { MdShield } from 'react-icons/md';
import { GoAlert } from 'react-icons/go';
import SeveritiesCount from './SeveritiesCount';
import SeverityCount from './SeverityCount';
import axios from 'axios';

const VulnorableProject = ({ project, setRefresh }) => {
    const url = 'http://localhost:3000/';
    const navigate = useNavigate();
    const [drop, setDrop] = useState(false);

    const handleScan = async () => {
        axios.defaults.withCredentials = true;
        await axios.post(
            `${url}api/scan?repo_name=${project.repository}&clone_url=${project.clone_url}`,
            {
                withCredentials: true,
            }
        );
        setRefresh(true);
        navigate('/dashboard');
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
                <div
                    className={
                        drop
                            ? 'ml-4 flex h-8 w-8 -rotate-180 transform items-center justify-center rounded-full bg-gray-200 duration-500'
                            : 'ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 duration-500'
                    }
                >
                    <BsFillCaretDownFill />
                </div>
            </div>
            <ul
                className={
                    drop
                        ? 'h-[340px] overflow-hidden border-b bg-gray-100 text-[#2f4f4f] transition-all duration-500 ease-in-out md:h-48'
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
                            VULNORABILITY
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
                    <div className="flex w-full items-center justify-center gap-8">
                        <button
                            onClick={() => {
                                navigate('/dashboard');
                            }}
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
                </nav>
            </ul>
        </section>
    );
};

export default VulnorableProject;
