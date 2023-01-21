import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ScannedProjects from './components/ScannedProjects';
import UnScannedProjects from './components/UnScannedProjects';
import { useOutletContext } from 'react-router-dom';
import { AiOutlineDownCircle } from 'react-icons/ai';

const url = 'http://localhost:3000/';

const Projects = () => {
    const [loading, setLoading] = useState(true);
    const [scannedData, setScannedData] = useState([]);
    const [unScannedData, setUnScannedData] = useState([]);
    const [active, setActive] = useOutletContext();
    const [username, setUsername] = useState([]);
    const [showFullScanned, setShowFullScanned] = useState(true);
    const [showFullUnScanned, setShowFullUnScanned] = useState(true);
    const [unscannedHeight, setUnscannedHeight] = useState(0);
    const [scannedHeight, setScannedHeight] = useState(0);
    const unScannedContainerRef = useRef(null);
    const scannedContainerRef = useRef(null);

    const incompleteScannedData = scannedData.slice(0, 3);
    const incompleteUnScannedData = unScannedData.slice(0, 3);

    const handleFetchData = async () => {
        try {
            setActive('projects');
            axios.defaults.withCredentials = true;
            const scannedprojectsResponse = await axios.get(
                `${url}api/projects/?scanned=true`,
                {
                    withCredentials: true,
                }
            );
            const unScannedprojectsResponse = await axios.get(
                `${url}api/projects/?scanned=false`,
                {
                    withCredentials: true,
                }
            );

            const userResponse = await axios.get(`${url}api/user`, {
                withCredentials: true,
            });

            const scannedProjects = await scannedprojectsResponse.data.projects;
            const unScannedProjects = await unScannedprojectsResponse.data
                .projects;
            const username = await userResponse.data.username;

            setScannedData(scannedProjects);
            setUnScannedData(unScannedProjects);
            setUsername(username);

            const unScannedHeight = unScannedContainerRef.current?.clientHeight;
            const scannedHeight = scannedContainerRef.current?.clientHeight;

            console.log(unScannedHeight, scannedHeight);

            setUnscannedHeight(unScannedHeight);
            setScannedHeight(scannedHeight);

            setShowFullScanned(false);
            setShowFullUnScanned(false);
            setLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        handleFetchData();
    }, []);

    if (loading) {
        return (
            <div
                role="status"
                className="flex h-full items-center justify-center"
            >
                <svg
                    aria-hidden="true"
                    className="mr-2 h-8 w-8 animate-spin fill-gray-500 text-gray-200 dark:text-gray-600"
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
        );
    }
    return (
        <main>
            <div className=" mx-4 flex flex-col items-center justify-center space-y-8 pb-10">
                <div className="flex w-[100%] flex-col">
                    <h2 className="mb-2 text-xl text-[#2f4f4f] underline">
                        Scanned Projects
                    </h2>
                    {showFullScanned
                        ? scannedData.map((project) => {
                              return (
                                  <ScannedProjects
                                      username={username}
                                      repository={project.repository}
                                      blocked={project.blocked}
                                      critical={project.critical}
                                      major={project.major}
                                      minor={project.minor}
                                      info={project.info}
                                      name={project.name}
                                      key={project.id}
                                      date={project.last_scanned}
                                  />
                              );
                          })
                        : incompleteScannedData.map((project) => {
                              return (
                                  <ScannedProjects
                                      username={username}
                                      repository={project.repository}
                                      blocked={project.blocked}
                                      critical={project.critical}
                                      major={project.major}
                                      minor={project.minor}
                                      info={project.info}
                                      name={project.name}
                                      key={project.id}
                                      date={project.last_scanned}
                                  />
                              );
                          })}
                    <div className=" flex items-center justify-center gap-2 text-xl">
                        <button
                            onClick={() => setShowFullScanned(!showFullScanned)}
                            className="flex items-center gap-2 bg-[#2f4f4f] text-white"
                        >
                            View {showFullScanned ? 'less' : 'more'}{' '}
                            <span
                                className={
                                    showFullScanned
                                        ? ' rotate-180 text-2xl duration-500'
                                        : 'rotate-0 text-2xl duration-500'
                                }
                            >
                                <AiOutlineDownCircle />
                            </span>{' '}
                        </button>
                    </div>
                </div>
                <div className="w-[100%]">
                    <h2 className="mb-2 text-xl text-[#2f4f4f] underline">
                        Unanalyzed Projects
                    </h2>
                    {showFullUnScanned
                        ? unScannedData.map((project) => {
                              return (
                                  <UnScannedProjects
                                      username={username}
                                      repository={project.repository}
                                      blocked={project.blocked}
                                      critical={project.critical}
                                      major={project.major}
                                      minor={project.minor}
                                      info={project.info}
                                      name={project.name}
                                      key={project.id}
                                      date={project.last_scanned}
                                  />
                              );
                          })
                        : incompleteUnScannedData.map((project) => {
                              return (
                                  <UnScannedProjects
                                      username={username}
                                      repository={project.repository}
                                      blocked={project.blocked}
                                      critical={project.critical}
                                      major={project.major}
                                      minor={project.minor}
                                      info={project.info}
                                      name={project.name}
                                      key={project.id}
                                      date={project.last_scanned}
                                  />
                              );
                          })}
                    <div className=" flex items-center justify-center gap-2 text-xl">
                        <button
                            onClick={() =>
                                setShowFullUnScanned(!showFullUnScanned)
                            }
                            className="flex items-center gap-2 bg-[#2f4f4f] text-white"
                        >
                            View {showFullUnScanned ? 'less' : 'more'}{' '}
                            <span
                                className={
                                    showFullUnScanned
                                        ? ' rotate-180 text-2xl duration-500'
                                        : 'rotate-0 text-2xl duration-500'
                                }
                            >
                                <AiOutlineDownCircle />
                            </span>{' '}
                        </button>
                    </div>
                </div>
                <div className="flex w-[100%] flex-col">
                    <h2 className="mb-2 text-xl text-[#2f4f4f] underline">
                        Scanned Projects
                    </h2>
                    <div ref={scannedContainerRef}>
                        {scannedData.map((project) => {
                            return (
                                <ScannedProjects
                                    username={username}
                                    repository={project.repository}
                                    blocked={project.blocked}
                                    critical={project.critical}
                                    major={project.major}
                                    minor={project.minor}
                                    info={project.info}
                                    name={project.name}
                                    key={project.id}
                                    date={project.last_scanned}
                                />
                            );
                        })}
                    </div>
                    <div className=" flex items-center justify-center gap-2 text-xl">
                        <button
                            onClick={() => setShowFullScanned(!showFullScanned)}
                            className="flex items-center gap-2 bg-[#2f4f4f] text-white"
                        >
                            View {showFullScanned ? 'less' : 'more'}{' '}
                            <span
                                className={
                                    showFullScanned
                                        ? ' rotate-180 text-2xl duration-500'
                                        : 'rotate-0 text-2xl duration-500'
                                }
                            >
                                <AiOutlineDownCircle />
                            </span>{' '}
                        </button>
                    </div>
                </div>
                <div className="w-[100%]">
                    <h2 className="mb-2 text-xl text-[#2f4f4f] underline">
                        Unanalyzed Projects
                    </h2>
                    <div
                        ref={unScannedContainerRef}
                        className={
                            showFullUnScanned
                                ? `h-[100px] overflow-hidden transition-all duration-500`
                                : `h-[11.5rem] overflow-hidden transition-all duration-500`
                        }
                    >
                        {unScannedData.map((project) => {
                            return (
                                <UnScannedProjects
                                    username={username}
                                    repository={project.repository}
                                    blocked={project.blocked}
                                    critical={project.critical}
                                    major={project.major}
                                    minor={project.minor}
                                    info={project.info}
                                    name={project.name}
                                    key={project.id}
                                    date={project.last_scanned}
                                />
                            );
                        })}
                    </div>
                    <div className=" flex items-center justify-center gap-2 text-xl">
                        <button
                            onClick={() =>
                                setShowFullUnScanned(!showFullUnScanned)
                            }
                            className="flex items-center gap-2 bg-[#2f4f4f] text-white"
                        >
                            View {showFullUnScanned ? 'less' : 'more'}{' '}
                            <span
                                className={
                                    showFullUnScanned
                                        ? ' rotate-180 text-2xl duration-500'
                                        : 'rotate-0 text-2xl duration-500'
                                }
                            >
                                <AiOutlineDownCircle />
                            </span>{' '}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Projects;
