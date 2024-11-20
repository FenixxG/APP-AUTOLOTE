import React from 'react';
import Header from './Header';
import Navbar from './Navbar';

function PageHome() {
    return (
        <React.StrictMode>
            <div className="page-wrapper">
                <Header />
                <Navbar />
            </div>
        </React.StrictMode>
    );
}

export default PageHome;
