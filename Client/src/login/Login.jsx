import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { LoginTextField as TextField } from '../login/loginTextField';
import Header from '../util/header';
import AccountButton from '../util/accButton';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../util/alert';

const Login = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState('');
    const [danger, setDanger] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const HandleSubmit = async (values) => {
        try {
            setLoading(true);
            const body = values;
            const url = `http://localhost:3000/api/auth/login`;
            axios.defaults.withCredentials = true;
            await axios(url, {
                method: 'POST',
                data: body,
                withCredentials: true,
            });
            navigate('/dashboard');
        } catch (error) {
            setLoading(false);
            const errorMsg = error.response.data.msg;
            setDanger(true);
            setAlert(errorMsg);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={HandleSubmit}
        >
            <main>
                <Alert name={alert} showAlert={showAlert} danger={danger} />
                <Header />
                <div className="flex h-full flex-col items-center">
                    <Form className="mb-10 w-[95vw] rounded-lg border bg-white p-10 shadow-lg 2xs:w-[80vw] sm:min-w-[400px] sm:max-w-[400px]">
                        <div className="mb-5 flex flex-col items-center justify-center text-center">
                            <p className="text-3xl font-bold text-[#2F4F4F]">
                                Sign in to your account{' '}
                            </p>
                        </div>
                        <TextField
                            id="1"
                            label="Email"
                            name="email"
                            type="email"
                        />
                        <TextField
                            id="2"
                            label="Password"
                            name="password"
                            type="password"
                        />
                        <AccountButton name="Sign In" loading={loading} />
                        <p className="my-5 text-center text-sm font-light text-gray-500">
                            New here?{' '}
                            <Link
                                className="text-primary-600 font-medium hover:underline"
                                to={'/signup'}
                            >
                                Create an account
                            </Link>{' '}
                        </p>
                    </Form>
                </div>
            </main>
        </Formik>
    );
};

export default Login;
