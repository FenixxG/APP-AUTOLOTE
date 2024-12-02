import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";

const Home = () => {
    return (
        <div className="app-body">
            <div className="container">
                {/* Breadcrumb */}
                <div className="row gx-3">
                    <div className="col-12 col-xl-6">
                        <ol className="breadcrumb mb-3">
                            <li className="breadcrumb-item">
                                <FiHome className="lh-1" />
                                <Link to="/app/home" className="text-decoration-none">Inicio</Link>
                            </li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">
                                <Link to="/app/home" className="text-decoration-none">Dashboard</Link>
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="row gx-3">
                    <div className="col-xl-6 col-sm-12 col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-8 col-12">
                                        <h3 className="mb-3">Congratulations John</h3>
                                        <p className="w-50">
                                            You have resolved
                                            <span className="text-success fw-bold">85%</span> more
                                            tickets than last year.
                                        </p>
                                        <div id="tickets"></div>
                                    </div>
                                    <div className="col-sm-4 col-12">
                                        <div className="text-end">
                                            <img src="assets/images/sales.svg" className="img-150" alt="Bootstrap Gallery" />
                                        </div>
                                        <div className="mt-5 d-flex flex-wrap gap-3">
                                            <div className="d-flex align-items-center">
                                                <div className="icons-box md bg-info rounded-3 me-3">
                                                    <i className="icon-add_task text-white fs-4"></i>
                                                </div>
                                                <div className="m-0">
                                                    <h3 className="m-0 fw-semibold">960</h3>
                                                    <p className="m-0 text-secondary">Resolved in 2024</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="icons-box md bg-danger rounded-3 me-3">
                                                    <i className="icon-add_task text-white fs-4"></i>
                                                </div>
                                                <div className="m-0">
                                                    <h3 className="m-0 fw-semibold">630</h3>
                                                    <p className="m-0 text-secondary">Resolved in 2023</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Calls</h5>
                                <div id="calls"></div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="d-flex flex-row">
                                    <div className="d-flex align-items-center">
                                        <div className="border border-info rounded-4 icons-box md">
                                            <i className="icon-support_agent text-info fs-3"></i>
                                        </div>
                                        <div className="ms-2">
                                            <h3 className="m-0">49</h3>
                                            <p className="m-0 text-secondary">Agents Online</p>
                                        </div>
                                    </div>
                                    <div className="ms-auto">
                                        <div id="sparkline1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Tickets Resolved</h5>
                                <div id="callsByCountry" className="auto-align-graph"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;