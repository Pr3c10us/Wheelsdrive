import React from 'react';

const ErrorCard = ({ error }) => {
    const severityString = () => {
        if (error.severity === 'BLOCKER') {
            return { code: 'B', colour: 'bg-red-600' };
        }
        if (error.severity === 'CRITICAL') {
            return { code: 'C', colour: 'bg-orange-600' };
        }
        if (error.severity === 'MAJOR') {
            return { code: 'H', colour: 'bg-orange-400' };
        }
        if (error.severity === 'MINOR') {
            return { code: 'M', colour: 'bg-yellow-500' };
        }
        if (error.severity === 'INFO') {
            return { code: 'L', colour: 'bg-red-600' };
        } else {
            return { code: 'N/A', colour: 'bg-gray-600' };
        }
    };
    const severity = severityString();
    // split the error component from : to get the component name
    const component = error.component.split(':')[1];

    return (
        <li className="mb-8 border border-t-4 border-[#2f4f4f] text-red-600">
            <div className="flex gap-4 border-b-2 px-3 py-2 sm:py-4 md:px-8">
                <div className="flex items-center justify-center">
                    <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xl text-black ${severity.colour}`}
                    >
                        {severity.code}
                    </span>
                </div>
                <h2 className=" max-w-[245px] break-words text-lg sm:text-xl text-[#2f4f4f] sm:max-w-none">
                    {error.message}
                </h2>
            </div>
            <div className="flex flex-col sm:space-y-2 px-2 py-4 pl-14 md:pl-20 ">
                <h3 className="break-words">
                    {' '}
                    <span className="text-[#2f4f4f]">File Location :</span> /
                    {component}
                </h3>
                <h3 className="break-words">
                    {' '}
                    <span className="text-[#2f4f4f]">At Line : </span>
                    {error.line}
                </h3>
                <h3 className="break-words">
                    {' '}
                    <span className="text-[#2f4f4f]">
                        Approximate time to fix :
                    </span>{' '}
                    {error.effort}
                </h3>
            </div>
        </li>
    );
};

export default ErrorCard;
