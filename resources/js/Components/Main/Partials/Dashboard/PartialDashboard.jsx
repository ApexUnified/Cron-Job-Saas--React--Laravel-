import React from 'react'

export default function PartialDashboard() {
    return (
        <>
            <div className="row">
                <div className="col-lg-6 col-12">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="card">
                                <span className="mask bg-primary opacity-10 border-radius-lg"></span>
                                <div className="card-body p-3 position-relative">
                                    <div className="row">
                                        <div className="col-8 text-start">
                                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                                <i className="bi bi-person text-dark text-gradient text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                                1600
                                            </h5>
                                            <span className="text-white text-sm">Users Active</span>
                                        </div>
                                        <div className="col-4">
                                            <div className="dropdown text-end mb-6">
                                                <a href="#" className="cursor-pointer" id="dropdownUsers1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi bi-ellipsis-h text-white"></i>
                                                </a>
                                                <ul className="dropdown-menu px-2 py-3" aria-labelledby="dropdownUsers1">
                                                    <li><a className="dropdown-item border-radius-md" href="#">Action</a></li>
                                                    <li><a className="dropdown-item border-radius-md" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item border-radius-md" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                            <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">+55%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 mt-4 mt-md-0">
                            <div className="card">
                                <span className="mask bg-dark opacity-10 border-radius-lg"></span>
                                <div className="card-body p-3 position-relative">
                                    <div className="row">
                                        <div className="col-8 text-start">
                                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                                <i className="ni ni-active-40 text-dark text-gradient text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                                357
                                            </h5>
                                            <span className="text-white text-sm">Click Events</span>
                                        </div>
                                        <div className="col-4">
                                            <div className="dropstart text-end mb-6">
                                                <a href="#" className="cursor-pointer" id="dropdownUsers2" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </a>
                                                <ul className="dropdown-menu px-2 py-3" aria-labelledby="dropdownUsers2">
                                                    <li><a className="dropdown-item border-radius-md" href="#">Action</a></li>
                                                    <li><a className="dropdown-item border-radius-md" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item border-radius-md" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                            <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">+124%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="card">
                                <span className="mask bg-dark opacity-10 border-radius-lg"></span>
                                <div className="card-body p-3 position-relative">
                                    <div className="row">
                                        <div className="col-8 text-start">
                                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                                <i className="ni ni-cart text-dark text-gradient text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                                2300
                                            </h5>
                                            <span className="text-white text-sm">Purchases</span>
                                        </div>
                                        <div className="col-4">
                                            <div className="dropdown text-end mb-6">
                                                <a href="#" className="cursor-pointer" id="dropdownUsers3" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-h text-white"></i>
                                                </a>
                                                <ul className="dropdown-menu px-2 py-3" aria-labelledby="dropdownUsers3">
                                                    <li><a className="dropdown-item border-radius-md" href="#">Action</a></li>
                                                    <li><a className="dropdown-item border-radius-md" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item border-radius-md" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                            <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">+15%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 mt-4 mt-md-0">
                            <div className="card">
                                <span className="mask bg-dark opacity-10 border-radius-lg"></span>
                                <div className="card-body p-3 position-relative">
                                    <div className="row">
                                        <div className="col-8 text-start">
                                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                                <i className="ni ni-like-2 text-dark text-gradient text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                                940
                                            </h5>
                                            <span className="text-white text-sm">Likes</span>
                                        </div>
                                        <div className="col-4">
                                            <div className="dropstart text-end mb-6">
                                                <a href="#" className="cursor-pointer" id="dropdownUsers4" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-h text-white"></i>
                                                </a>
                                                <ul className="dropdown-menu px-2 py-3" aria-labelledby="dropdownUsers4">
                                                    <li><a className="dropdown-item border-radius-md" href="#">Action</a></li>
                                                    <li><a className="dropdown-item border-radius-md" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item border-radius-md" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                            <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">+90%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-12 mt-4 mt-lg-0">
                    <div className="card shadow h-100">
                        <div className="card-header pb-0 p-3">
                            <h6 className="mb-0">Reviews</h6>
                        </div>
                        <div className="card-body pb-0 p-3">
                            <ul className="list-group">
                                <li className="list-group-item border-0 d-flex align-items-center px-0 mb-0">
                                    <div className="w-100">
                                        <div className="d-flex mb-2">
                                            <span className="me-2 text-sm font-weight-bold text-dark">Positive Reviews</span>
                                            <span className="ms-auto text-sm font-weight-bold">80%</span>
                                        </div>
                                        <div>
                                            <div className="progress progress-md">
                                                <div className="progress-bar bg-primary w-80" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                    <div className="w-100">
                                        <div className="d-flex mb-2">
                                            <span className="me-2 text-sm font-weight-bold text-dark">Neutral Reviews</span>
                                            <span className="ms-auto text-sm font-weight-bold">17%</span>
                                        </div>
                                        <div>
                                            <div className="progress progress-md">
                                                <div className="progress-bar bg-primary w-10" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                    <div className="w-100">
                                        <div className="d-flex mb-2">
                                            <span className="me-2 text-sm font-weight-bold text-dark">Negative Reviews</span>
                                            <span className="ms-auto text-sm font-weight-bold">3%</span>
                                        </div>
                                        <div>
                                            <div className="progress progress-md">
                                                <div className="progress-bar bg-primary w-5" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer pt-0 p-3 d-flex align-items-center">
                            <div className="w-60">
                                <p className="text-sm">
                                    More than <b>1,500,000</b> developers used Creative Tim's products and over <b>700,000</b> projects were created.
                                </p>
                            </div>
                            <div className="w-40 text-end">
                                <a className="btn btn-dark mb-0 text-end" href="#">View all reviews</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
