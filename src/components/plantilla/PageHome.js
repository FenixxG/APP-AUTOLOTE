import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';

function PageHome() {
    return (
        <React.StrictMode>
            <Header />
            <Navbar />
            <Home />
            {/* <Footer /> */}
        </React.StrictMode>
    );
}

export default PageHome;
