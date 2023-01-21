import React from 'react';
import { Link } from 'react-router-dom';
import { BiScan } from 'react-icons/bi';

const ScannedProjects = ({
    username,
    repository,
    blocked,
    critical,
    major,
    minor,
    info,
}) => {
    return (
        <div className="mb-4 flex flex-row items-center justify-between gap-2 rounded-lg border border-gray-300 px-2 py-4 shadow-md sm:items-center">
            <div className="flex flex-grow flex-col gap-2 sm:flex-row sm:items-center">
                <div
                    className={
                        blocked > 0 ||
                        critical > 0 ||
                        major > 0 ||
                        minor > 0 ||
                        info > 0
                            ? 'text-md mb-1 w-[120px] max-w-xs break-words text-red-600 duration-300 md:w-[220px] lg:w-[300px]'
                            : 'text-md mb-1 w-[120px] max-w-xs break-words text-green-500 duration-300 md:w-[220px] lg:w-[300px]'
                    }
                >
                    {repository}
                </div>
                <ul className="flex flex-1 space-x-2 text-sm sm:justify-center">
                    <li>
                        <span
                            className={
                                blocked > 0
                                    ? 'rounded-l-sm bg-red-200 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                    : 'rounded-l-sm bg-slate-200 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                            }
                        >
                            {blocked}
                        </span>
                        <span
                            className={
                                blocked > 0
                                    ? 'rounded-r-sm bg-red-600 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                    : 'rounded-r-sm bg-slate-300 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                            }
                        >
                            D
                        </span>
                    </li>
                    <li>
                        <span
                            className={
                                critical > 0
                                    ? 'rounded-l-sm bg-red-100 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                    : 'rounded-l-sm bg-slate-200 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                            }
                        >
                            {critical}
                        </span>
                        <span
                            className={
                                critical > 0
                                    ? 'rounded-r-sm bg-red-500 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                    : 'rounded-r-sm bg-slate-300 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                            }
                        >
                            C
                        </span>
                    </li>
                    <li>
                        <span
                            className={
                                major > 0
                                    ? 'rounded-l-sm bg-orange-200 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                    : 'rounded-l-sm bg-slate-200 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                            }
                        >
                            {major}
                        </span>
                        <span
                            className={
                                major > 0
                                    ? 'rounded-r-sm bg-orange-600 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                    : 'rounded-r-sm bg-slate-300 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                            }
                        >
                            H
                        </span>
                    </li>
                    <li>
                        <span
                            className={
                                minor > 0
                                    ? 'rounded-l-sm bg-orange-100 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                    : 'rounded-l-sm bg-slate-200 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                            }
                        >
                            {minor}
                        </span>
                        <span
                            className={
                                minor > 0
                                    ? 'rounded-r-sm bg-orange-500 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                    : 'rounded-r-sm bg-slate-300 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                            }
                        >
                            M
                        </span>
                    </li>
                    <li>
                        <span
                            className={
                                blocked > 0
                                    ? 'rounded-l-sm bg-yellow-100 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                    : 'rounded-l-sm bg-slate-200 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                            }
                        >
                            {info}
                        </span>
                        <span
                            className={
                                info > 0
                                    ? 'rounded-r-sm bg-yellow-600 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                    : 'rounded-r-sm bg-slate-300 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                            }
                        >
                            L
                        </span>
                    </li>
                </ul>
            </div>
            <Link to={`/dashboard/${repository}`}>
                <BiScan className="min-w-24 text-3xl text-black duration-300 hover:text-gray-700" />
            </Link>
        </div>
    );
};

export default ScannedProjects;
