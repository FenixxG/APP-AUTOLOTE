import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';

function PageHome() {
    return (
        <React.StrictMode>
            <div className="page-wrapper">
                <Header />
                <Navbar />
                <Home />
                <Footer />
            </div>
        </React.StrictMode>
    );
}

export default PageHome;
