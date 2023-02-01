import React from 'react';
import { useField, ErrorMessage } from 'formik';

export const TextField = ({ label, dangerInput, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="group relative z-0 mb-6 w-full">
            <input
                {...field}
                {...props}
                autoComplete={`field.name === 'password' ? 'on' : 'off'`}
                id={field.name}
                className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 ${
                    (dangerInput || (meta.touched && meta.error)) &&
                    'border-b-[1px] border-b-red-500 focus:border-red-600  '
                } `}
                placeholder=" "
                required
            />
            <label
                htmlFor={field.name}
                className={`absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm  duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 ${
                    (dangerInput || (meta.touched && meta.error)) &&
                    'text-red-500 peer-focus:text-red-600 '
                } `}
            >
                {label}
            </label>
            <ErrorMessage
                component="div"
                name={field.name }
                className="text-[10px] text-red-500"
            />
        </div>
    );
};
