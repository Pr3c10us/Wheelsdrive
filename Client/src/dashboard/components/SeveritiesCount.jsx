import React from 'react';

const SeveritiesCount = ({ blocker, critical, major, minor, info }) => {
    return (
        <ul className="mb-1 flex flex-1 items-center md:justify-center space-x-2 text-sm text-black sm:mb-0 md:flex">
            <li className="flex">
                <div
                    className={
                        blocker > 0
                            ? 'flex sm:w-10 w-7 items-center justify-center rounded-l-sm bg-red-200 '
                            : 'flex sm:w-10 w-7 items-center justify-center rounded-l-sm bg-slate-200 '
                    }
                >
                    {blocker || 0}
                </div>
                <div
                    className={
                        blocker > 0
                            ? 'rounded-r-sm bg-red-600 px-[6px] py-[2px] sm:py-1 sm:px-[0.63rem] '
                            : 'rounded-r-sm bg-slate-300 px-[6px] py-[2px] sm:py-1 sm:px-[0.63rem] '
                    }
                >
                    D
                </div>
            </li>
            <li className="flex">
                <div
                    className={
                        critical > 0
                            ? 'flex sm:w-10 w-7 items-center justify-center rounded-l-sm bg-orange-200 '
                            : 'flex sm:w-10 w-7 items-center justify-center rounded-l-sm bg-slate-200 '
                    }
                >
                    {critical || 0}
                </div>
                <div
                    className={
                        critical > 0
                            ? 'rounded-r-sm bg-orange-600 px-[6px] py-[2px] sm:py-1 sm:px-[0.63rem] '
                            : 'rounded-r-sm bg-slate-300 px-[6px] py-[2px] sm:py-1 sm:px-[0.63rem] '
                    }
                >
                    C
                </div>
            </li>
            <li className="flex">
                <div
                    className={
                        major > 0
                            ? 'flex sm:w-10 w-7 items-center justify-center rounded-l-sm bg-orange-100 '
                            : 'flex sm:w-10 w-7 items-center justify-center rounded-l-sm bg-slate-200 '
                    }
                >
                    {major || 0}
                </div>
                <div
                    className={
                        major > 0
                            ? 'rounded-r-sm bg-orange-400 px-[6px] py-[2px] sm:py-1 sm:px-[0.63rem] '
                            : 'rounded-r-sm bg-slate-300 px-[6px] py-[2px] sm:py-1 sm:px-[0.63rem] '
                    }
                >
                    H
                </div>
            </li>
            <li className="flex">
                <div
                    className={
                        minor > 0
                            ? 'flex sm:w-10 w-7 items-center justify-center rounded-l-sm bg-yellow-100 '
                            : 'flex sm:w-10 w-7 items-center justify-center rounded-l-sm bg-slate-200 '
                    }
                >
                    {minor || 0}
                </div>
                <div
                    className={
                        minor > 0
                            ? 'rounded-r-sm bg-yellow-500 px-[6px] py-[2px] sm:py-1 sm:px-[0.63rem] '
                            : 'rounded-r-sm bg-slate-300 px-[6px] py-[2px] sm:py-1 sm:px-[0.63rem] '
                    }
                >
                    M
                </div>
            </li>
            <li className="flex">
                <div
                    className={
                        info > 0
                            ? 'flex sm:w-10 w-7 items-center justify-center rounded-l-sm bg-gray-200 '
                            : 'flex sm:w-10 w-7 items-center justify-center rounded-l-sm bg-slate-200 '
                    }
                >
                    {info || 0}
                </div>
                <div
                    className={
                        info > 0
                            ? 'rounded-r-sm bg-gray-600 px-[6px] py-[2px] sm:py-1 sm:px-[0.63rem] '
                            : 'rounded-r-sm bg-slate-300 px-[6px] py-[2px] sm:py-1 sm:px-[0.63rem] '
                    }
                >
                    L
                </div>
            </li>
        </ul>
    );
};

export default SeveritiesCount;
