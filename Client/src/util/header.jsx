// import React from 'react';

// const Header = () => {
//     return (
//         <div className="mb-5 flex flex-col items-center justify-center">
//             <div className=" mt-14 h-10 w-10 bg-[#000080]"></div>

//             <h1 className="text-[#2F4F4F]">Vulno</h1>
//         </div>
//     );
// };

// export default Header;
import React from 'react';
import logo from '../assets/wheelsdrive.svg';

const Header = () => {
    return (
        <div className="mb-5 flex flex-col items-center justify-center">
            <img className=" mt-14 mb-5 w-48" src={logo} alt="logo" />
        </div>
    );
};

export default Header;
