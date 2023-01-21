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
        <div className="mb-4 flex flex-col gap-2 border border-gray-300 p-4 sm:flex-row sm:items-center">
            <div className="flex-1">
                <p className="text-sm ">{username}</p>
                <div className='max-w-[150px] break-words'>
                    <Link
                        to={`/dashboard/${repository}`}
                        className="max-w-xs cursor-pointer break-words text-xl text-[#2424be] hover:text-[#2424be]"
                    >
                        {repository}
                    </Link>
                </div>
            </div>
            <ul className="flex flex-1 space-x-2  text-sm">
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
            <p className="hidden flex-1 flex-col items-end text-sm italic text-slate-400 md:flex">
                <span>Last Scanned</span>
                {date}
            </p>
        </div>
    );
};

export default VulnorableProject;
