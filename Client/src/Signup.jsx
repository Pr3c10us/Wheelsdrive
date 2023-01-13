import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './signupTextField';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from './util/header';
import AccountButton from './util/accButton';
import Alert from './util/alert';

const Signup = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [dangerEmailInput, setDangerEmailInput] = useState(false);
    const [dangerUsernameInput, setDangerUsernamInput] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [danger, setDanger] = useState(false);
    const alertStyle =
        'fixed top-10 right-0 border-l-4 justify-center items-center flex transition-all duration-300 min-h-[50px] min-w-[300px]';

    const signupApi = 'http://localhost:3000/api/auth/verifyEmail';

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            setDangerUsernamInput(false);
            setDangerEmailInput(false);
            const body = values;
            const response = await axios.post(signupApi, body);

            setDanger(false);
            setAlert(response.data.msg);
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                navigate(`/otp/${values.username}`);
            }, 3000);

            return clearTimeout();
        } catch (error) {
            setLoading(false);
            const errorMsg = error.response.data.msg;
            setDanger(true);
            setAlert(errorMsg);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);
            if (errorMsg.includes('Username')) {
                setDangerUsernamInput(true);
            }
            if (errorMsg.includes('Email')) {
                setDangerEmailInput(true);
            }
            return clearTimeout();
        }
    };

    const validate = Yup.object({
        email: Yup.string()
            .email('invalid Email address')
            .required('Please provide an Email address'),
        username: Yup.string()
            .min(6, 'Username must be more than 8 characters')
            .required('Please provide a username'),
        firstname: Yup.string()
            .min(4, 'Firstname must be more than 8 characters')
            .required('Please provide a Firstname'),
        lastname: Yup.string()
            .min(4, 'Lastname must be more than 8 characters')
            .required('Please provide a Lastname'),
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
            .required('Provide the password again'),
    });
    return (
        <Formik
            initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={validate}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <main>
                    <Alert name={alert} showAlert={showAlert} danger={danger} />
                    <Header />
                    <div className="flex flex-col items-center ">
                        <Form className="mb-10 w-[80vw] rounded-lg bg-white p-10 shadow-lg sm:min-w-[400px] sm:max-w-[400px]">
                            <div className="mb-5 flex flex-col items-center justify-center text-center">
                                <p className="text-3xl font-bold text-[#2F4F4F]">
                                    Create your free account{' '}
                                </p>
                            </div>
                            <TextField
                                label="Firstname"
                                name="firstname"
                                type="text"
                            />
                            <TextField
                                label="Lastname"
                                name="lastname"
                                type="text"
                            />

                            <TextField
                                dangerInput={dangerEmailInput}
                                label="Email"
                                name="email"
                                type="email"
                            />
                            <TextField
                                dangerInput={dangerUsernameInput}
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
                            <AccountButton
                                name="Create Account"
                                loading={loading}
                            />
                            <p className="my-5 text-center text-sm font-light text-gray-500">
                                Have an account?{' '}
                                <Link
                                    className="text-primary-600 font-medium hover:underline"
                                    to={'/login'}
                                >
                                    Login now{' '}
                                </Link>{' '}
                            </p>
                        </Form>
                    </div>
                    <div></div>
                </main>
            )}
        </Formik>
    );
};

export default Signup;
