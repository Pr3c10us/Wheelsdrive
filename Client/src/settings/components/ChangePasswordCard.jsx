import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Alert from '../../util/alert';
import axios from 'axios';
import { ChangePasswordTextField as TextField } from './ChangePasswordTextField';

const ChangePasswordCard = ({ ...props }) => {
    const [alert, setAlert] = useState('');
    const [danger, setDanger] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const HandleChangePassword = async (values) => {
        try {
            setLoading(true);
            if (values.newPassword !== values.confirmPassword) {
                setDanger(true);
                setAlert('Passwords do not match');
                setShowAlert(true);
                setTimeout(() => {
                    setAlert('');
                    setShowAlert(false);
                    setLoading(false);
                }, 3000);
                return;
            }
            const body = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            };
            const url = `http://54.158.190.109:3000/api/user/password`;
            axios.defaults.withCredentials = true;
            await axios(url, {
                method: 'PUT',
                data: body,
                withCredentials: true,
            });
            setDanger(false);
            setAlert('Password changed successfully');
            setShowAlert(true);
            setTimeout(() => {
                setAlert('');
                setShowAlert(false);
                setLoading(false);
            }, 3000);
        } catch (error) {
            console.log(error);
            const errorMsg = error.response.data.msg;
            setDanger(true);
            setAlert(errorMsg);
            setShowAlert(true);
            setTimeout(() => {
                setAlert('');
                setShowAlert(false);
                setLoading(false);
            }, 3000);
        }
    };
    return (
        <Formik
            initialValues={{
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            }}
            onSubmit={HandleChangePassword}
        >
            <main className="nsm: my-8 w-full max-w-xl border bg-white">
                <Alert name={alert} showAlert={showAlert} danger={danger} />
                <nav className="border-b p-4">
                    <h2>
                        <span className="text-2xl font-bold text-[#2F4F4F]">
                            Change Password
                        </span>
                    </h2>
                </nav>
                <div className="flex h-full w-full flex-col items-center">
                    <Form className="flex w-full flex-col px-4 py-6">
                        <TextField
                            id="1"
                            label="Old Password"
                            name="oldPassword"
                            type="password"
                        />
                        <TextField
                            id="2"
                            label="New Password"
                            name="newPassword"
                            type="password"
                        />
                        <TextField
                            id="2"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                        />
                        <div className="mt-4 flex w-full flex-col items-center justify-center">
                            {loading ? (
                                <div
                                    type="button"
                                    className="flex h-12 w-full items-center justify-center rounded-lg border-none bg-[#2f4f4f]  text-white hover:border-none hover:outline-none focus:outline-none"
                                >
                                    <div
                                        role="status"
                                        className="flex h-full items-center justify-center"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="mr-2 h-8 w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
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
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="h-12 w-full border-none bg-[#2f4f4f] text-white hover:border-none hover:outline-none focus:outline-none "
                                >
                                    <span>Change Password</span>
                                </button>
                            )}
                        </div>
                    </Form>
                </div>
            </main>
        </Formik>
    );
};

export default ChangePasswordCard;
