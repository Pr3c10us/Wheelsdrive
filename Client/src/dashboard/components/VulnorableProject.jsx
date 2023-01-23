import React from 'react';
import { Link } from 'react-router-dom';

const VulnorableProject = ({
    username,
    repository,
    blocked,
    critical,
    major,
    minor,
    info,
    date,
}) => {
    return (
        <Link
            to={`/dashboard/${repository}`}
            className="mb-4 flex flex-col rounded-lg border border-gray-200 py-3 px-4 shadow transition-all duration-500 hover:bg-gray-100 hover:shadow-md sm:flex-row sm:items-center sm:gap-4"
        >
            <div className="mb-2 flex-1 sm:mb-0">
                <p className="text-[0.7rem] font-bold text-gray-400 ">
                    {username}
                </p>
                <div className="w-[150px] break-words lg:w-[200px]">
                    <h3 className="max-w-xs cursor-pointer break-words text-lg font-bold text-[#2f4f4f] hover:text-[#2f4f4f]">
                        {repository}
                    </h3>
                </div>
            </div>
            <ul className="mb-1 flex flex-1 space-x-2 text-sm text-black sm:mb-0">
                <li>
                    <span
                        className={
                            blocked > 0
                                ? 'rounded-l-sm bg-red-200 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                                : 'rounded-l-sm bg-slate-200 px-[6px] py-1 sm:px-2 lg:px-3  lg:py-2'
                        }
                    >
                        {blocked || 0}
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
                        {critical || 0}
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
                        {major || 0}
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
                        {minor || 0}
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
                        {info || 0}
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
            <p className="hidden flex-1 flex-col items-end text-right text-[0.7rem] italic leading-4 text-slate-400 md:flex">
                <span>Last Scanned</span>
                {date}
            </p>
        </Link>
    );
};

export default VulnorableProject;
