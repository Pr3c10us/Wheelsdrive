import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const url = 'http://localhost:3000/';
    const handleEffect = async () => {
        try {
            const response = await axios.get(`${url}api/user`, {
                withCredentials: true,
            });

            setUsername(response.data.username);
        } catch (error) {
            const errorMsg = error.message;
            setUsername(errorMsg);
        }
    };
    useEffect(() => {
        handleEffect();
    }, []);

    return <div>{username}</div>;
};

export default Dashboard;
