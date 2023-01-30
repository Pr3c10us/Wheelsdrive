import 'dotenv/config';
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import Header from '../util/header';
import AccountButton from '../util/accButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../util/alert';
import OtpInput from 'otp-input-react';

const Login = () => {
    const [timeLeft, setTimeLeft] = useState(59);
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [alert, setAlert] = useState('');
    const [danger, setDanger] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (code) => setCode(code);

    const handleClick = async () => {
        try {
            setTimeLeft(59);
            const url = `http://${
                process.env.REACT_APP_HOST_IP
            }:3000/api/auth/sendCode/${window.location.pathname.split('/')[2]}`;
            axios.defaults.withCredentials = true;
            const response = await axios(url, {
                method: 'GET',
                withCredentials: true,
            });

            setDanger(false);
            setAlert(response.data.msg);
            setShowAlert(true);

            setTimeout(
                () => {
                    setShowAlert(false);
                },

                3000
            );

            return clearTimeout();
        } catch (error) {
            const errorMsg = error.response.data.msg;
            setDanger(true);
            setAlert(errorMsg);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const HandleSubmit = async (values) => {
        try {
            setLoading(true);
            // get username from url params
            const username = window.location.pathname.split('/')[2];
            const body = { code, username };
            const url = `http://${process.env.REACT_APP_HOST_IP}:3000/api/auth/signup`;
            axios.defaults.withCredentials = true;
            const response = await axios(url, {
                method: 'POST',
                data: body,
                withCredentials: true,
            });

            setDanger(false);
            setAlert(response.data.msg);
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                navigate(`/login`);
            }, 3000);

            return clearTimeout();
        } catch (error) {
            setLoading(false);
            const errorMsg = error.response.data.msg;
            setDanger(true);
            setAlert(errorMsg);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return clearTimeout();
        }
    };
    return (
        <Formik
            initialValues={{ code: '', username: '' }}
            onSubmit={HandleSubmit}
        >
            <main>
                <Alert name={alert} showAlert={showAlert} danger={danger} />
                <div className="flex h-full flex-col items-center">
                    <Header />
                    <Form className="mb-10 w-[80vw] rounded-lg bg-white p-10 text-center shadow-lg sm:min-w-[400px] sm:max-w-[400px] ">
                        <div className="mb-5 flex flex-col items-center justify-center text-center">
                            <h1 className="text-3xl font-bold text-[#2F4F4F]">
                                Email Verification
                            </h1>
                            <p className="text-sm text-gray-500">
                                We have sent a code to your email
                            </p>
                        </div>
                        <OtpInput
                            value={code}
                            onChange={handleChange}
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            secure={false}
                            inputClassName="font-bold border-b-2 border-black focus:outline-none focus:border-[#2F4F4F]"
                            inputStyles={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '2rem',
                                margin: '0 ',
                            }}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '0',
                                marginBottom: '2rem',
                            }}
                        />

                        <AccountButton name="Submit" loading={loading} />
                        <p className="my-5 inline-block cursor-default p-0 text-center text-sm font-light text-blue-500">
                            {timeLeft > 0 ? (
                                'wait ' + timeLeft + ' seconds to resend OTP'
                            ) : (
                                <p
                                    onClick={handleClick}
                                    className="inline-block cursor-pointer border-none bg-white p-0 hover:underline"
                                >
                                    Resend OTP
                                </p>
                            )}
                        </p>
                    </Form>
                </div>
            </main>
        </Formik>
    );
};

export default Login;
