import React from 'react';
import dotenv from 'dotenv';
import ChangePasswordCard from './components/ChangePasswordCard';
import DeleteAccount from './components/DeleteAccount';

const AccountSettings = () => {
    return (
        <main>
            <div className="flex flex-col items-center">
                <ChangePasswordCard />
            </div>
            <div>
                <DeleteAccount />
            </div>
        </main>
    );
};

export default AccountSettings;
