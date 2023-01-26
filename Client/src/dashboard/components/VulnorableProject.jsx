import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { IoMdBug } from 'react-icons/io';
import { MdShield } from 'react-icons/md';
import { GoAlert } from 'react-icons/go';
import SeveritiesCount from './SeveritiesCount';
import SeverityCount from './SeverityCount';

const VulnorableProject = ({ project }) => {
    const [drop, setDrop] = useState(false);

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
                to={`/dashboard/${project.repository}`}
                className="flex cursor-pointer items-center justify-between border border-gray-200 py-3 px-2 transition-all duration-500"
            >
                <div className="flex grow flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="mb-0 ">
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
                        <div>Last Scanned</div>
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
                        ? 'h-48 overflow-hidden bg-gray-100 text-[#2f4f4f] transition-all duration-500'
                        : 'h-0 overflow-hidden bg-gray-100 text-[#2f4f4f] transition-all duration-500'
                }
            >
                <li className="flex items-center justify-between border-b p-4 text-lg">
                    <div className="flex items-center gap-2 ">
                        <IoMdBug />
                        <h3>BUG</h3>
                    </div>
                    <SeverityCount
                        blocker={project.bugBlocker}
                        critical={project.bugCritical}
                        major={project.bugMajor}
                        minor={project.bugMinor}
                        info={project.bugInfo}
                    />
                </li>
                <li className="flex items-center justify-between border-b p-4 text-lg">
                    <div className="flex items-center gap-2 ">
                        <MdShield />
                        <h3>VULNORABILITY</h3>
                    </div>
                    <SeverityCount
                        blocker={project.vulnerabilityBlocker}
                        critical={project.vulnerabilityCritical}
                        major={project.vulnerabilityMajor}
                        minor={project.vulnerabilityMinor}
                        info={project.vulnerabilityInfo}
                    />
                </li>
                <li className="flex items-center justify-between p-4 text-lg">
                    <div className="flex items-center gap-2">
                        <GoAlert />
                        <h3>CODE_SMELL</h3>
                    </div>
                    <SeverityCount
                        blocker={project.codeSmellBlocker}
                        critical={project.codeSmellCritical}
                        major={project.codeSmellMajor}
                        minor={project.codeSmellMinor}
                        info={project.codeSmellInfo}
                    />
                </li>
            </ul>
        </section>
    );
};

export default VulnorableProject;
