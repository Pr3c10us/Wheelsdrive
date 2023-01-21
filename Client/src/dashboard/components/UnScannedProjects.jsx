import React from 'react';
import { Link } from 'react-router-dom';
import { BiScan } from 'react-icons/bi';

const UnScannedProjects = ({ username, repository, id }) => {
    return (
        <div
            id={id}
            className="mb-4 flex flex-row items-center justify-between gap-2 rounded-lg border border-gray-300 p-2 shadow-md"
        >
            <div className="max-w-[80%] break-words text-xl text-black">
                {repository}
            </div>
            <Link to={`/dashboard/${repository}`}>
                <BiScan className="min-w-24 text-3xl text-green-600 duration-300 hover:text-green-500" />
            </Link>
        </div>
    );
};

export default UnScannedProjects;
