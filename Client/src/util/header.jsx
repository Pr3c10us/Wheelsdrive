import React from 'react';
import logo from '../assets/wheelsdrive.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="mb-5 flex flex-col items-center justify-center">
            <Link to={'/'}>
                <img className=" mt-14 mb-5 w-48" src={logo} alt="logo" />
            </Link>
        </div>
    );
};

export default Header;
