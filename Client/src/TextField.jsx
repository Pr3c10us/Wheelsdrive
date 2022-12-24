import React from 'react';
import { useField, ErrorMessage } from 'formik';

export const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    console.log(meta);
    return (
        <div className="mb-5 flex flex-col">
            <label className="" htmlFor={field.name}>
                {label}
            </label>
            <input
                className={`rounded-md border-[1px] border-[#2f4f4f3b] p-3 py-[6px] ${
                    meta.touched && meta.error && 'border-[1px] border-red-500'
                } `}
                {...field}
                {...props}
                autoComplete="off"
            />
            <ErrorMessage
                component="div"
                name={field.name}
                className="text-red-500 text-[10px]"
            />
        </div>
    );
};
