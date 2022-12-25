import React from 'react';

const Alert = ({ name, showAlert, danger }) => {
    const alertStyle =
        'fixed top-1 left-10 right-10 mb-4 flex justify-center items-center rounded-lg p-4 dark:bg-red-200 transition-all duration-300 ease-in-out text-sm sm:text-base text-center ';
    return (
        <div
            id={name}
            className={`${
                showAlert ? `${alertStyle}` : `${alertStyle} -translate-y-48 `
            }  ${
                danger
                    ? 'border-red-500 bg-red-100 text-red-700'
                    : 'border-green-500 bg-green-100 text-green-700 '
            }`}
            role="alert"
        >
            <svg
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0"
                fillRule="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-lg font-medium">{name}</div>
        </div>
    );
};

export default Alert;
