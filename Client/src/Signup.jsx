import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { useState } from 'react';

const Signup = () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        username: '',
        password: '',
    });

    const validate = Yup.object({
        email: Yup.string()
            .email('invalid Email address')
            .required('Please provide an Email address'),
        username: Yup.string()
            .min(8, 'Username must be more than 8 characters')
            .required('Please provide a username'),
        password: Yup.string()
            .required('please provide a password')
            .matches(
                /[A-Z]/,
                'Password must contain at least one uppercase letter'
            )
            .matches(
                /[a-z]/,
                'Password must contain at least one lowercase letter'
            )
            .matches(/\d/, 'Password must contain at least one number')
            .matches(
                /[!@#$%^&*]/,
                'Password must contain at least one special character (!@#$%^&*)'
            )
            .min(8, 'Password must be at least 8 characters long')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password Does not match')
            .required('please provide the password again'),
    });
    return (
        <Formik
            initialValues={{
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                const body = values;
                setUserInfo({
                    email: body.email,
                    username: body.username,
                    password: body.password,
                });
            }}
        >
            {(formik) => (
                <main>
                    <div className="flex h-screen flex-col items-center ">
                        <div className="m-5 mt-14 h-10 w-10 bg-[#000080]"></div>
                        <div className="mb-5 flex flex-col items-center justify-center">
                            <h1 className="text-4xl font-bold">Signup</h1>
                            <p className="text-[#2F4F4F]">
                                Create your account to get started{' '}
                            </p>
                        </div>
                        <Form className="mb-10 w-[80vw] rounded-lg bg-white p-10 shadow-lg sm:min-w-[400px] sm:max-w-[400px]">
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                            />
                            <TextField
                                label="Username"
                                name="username"
                                type="text"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                            />
                            <TextField
                                label="Confirm Passord"
                                name="confirmPassword"
                                type="password"
                            />
                            <button
                                type="submit"
                                className="mt-5 w-full rounded bg-[#191970] py-2 px-4 font-bold text-white transition-all duration-300 "
                            >
                                Register
                            </button>
                        </Form>
                    </div>
                    <div></div>
                </main>
            )}
        </Formik>
    );
};

export default Signup;
