import React from 'react';

const ProjectInProgress = ({ project }) => {
    return (
        <div className="flex items-center justify-between border border-gray-200 py-1 px-2 transition-all duration-500">
            <div className="mb-2 md:mb-0 ">
                <p className="text-[0.7rem] font-bold text-gray-400 ">
                    {project.username}
                </p>
                <div className="w-[150px] break-words lg:w-[200px]">
                    <h3 className="max-w-xs break-words text-lg font-bold  text-[#2f4f4f] hover:text-[#2f4f4f]">
                        {project.repository}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ProjectInProgress;
