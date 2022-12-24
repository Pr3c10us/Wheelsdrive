import React from 'react';
import { useField, ErrorMessage } from 'formik';

export const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    console.log(meta);
    return (
        <div className="mb-5 flex flex-col">
            <label className=" text-sm" htmlFor={field.name}>
                {label}
            </label>
            <input
                className={`rounded-none border-b-[1px] border-b-[#2f4f4f3b] p-[6px] text-xl text-[#2F4F4F] focus:outline-none ${
                    meta.touched &&
                    meta.error &&
                    'border-b-[1px] border-b-red-500'
                } `}
                {...field}
                {...props}
                autoComplete="off"
            />
            <ErrorMessage
                component="div"
                name={field.name}
                className="text-[10px] text-red-500"
            />
        </div>
    );
};
