import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
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
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
            ),
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
                    <div className="flex flex-col items-center justify-center">
                        <div className="m-10 h-10 w-10 bg-[#000080]"></div>
                        <Form className="mb-10 w-[80vw] rounded-lg bg-white p-10 shadow-lg sm:min-w-[400px] sm:max-w-[400px]">
                            <div className="mb-5 flex flex-col items-center justify-center">
                                <h1 className="text-3xl ">Signup</h1>
                                <p className="text-[#2F4F4F]">
                                    Create your account to get started{' '}
                                </p>
                            </div>
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
                                className="mt-5 w-full rounded bg-[#191970] py-2 px-4 font-bold text-white transition-all duration-300
                            hover:bg-blue-500 hover:shadow-md"
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
