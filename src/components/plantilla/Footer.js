import React from 'react';

const Footer = () => {
    return (
        <div className="app-footer">
            <div className="container">
                <span>&copy; {new Date().getFullYear()} JMC-COPART</span>
            </div>
        </div>
    );
};

export default Footer;