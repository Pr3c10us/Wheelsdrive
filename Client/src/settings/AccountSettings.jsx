import React from 'react';
import ChangePasswordCard from './components/ChangePasswordCard';
import DeleteAccount from './components/DeleteAccount';
import ChangeGithubToken from './components/ChangeGithubToken';

const AccountSettings = () => {
    return (
        <main>
            <div className="flex flex-col items-center">
                <ChangePasswordCard />
            </div>
            <div>
                <ChangeGithubToken />
            </div>
            <div>
                <DeleteAccount />
            </div>
        </main>
    );
};

export default AccountSettings;
