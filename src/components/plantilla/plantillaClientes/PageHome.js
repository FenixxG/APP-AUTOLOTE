import React from 'react';
import Header from './Header';
import Banner from './Banner';


function PageHome() {
    return (
        <React.StrictMode>
            <div className="page-wrapper">
                <Header />
                <Banner />
            </div>
        </React.StrictMode>
    );
}

export default PageHome;
