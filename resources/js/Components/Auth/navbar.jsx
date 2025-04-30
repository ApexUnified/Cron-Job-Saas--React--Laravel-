import { Link } from '@inertiajs/react'
import React from 'react'

export default function navbar() {
    return (
        <>

            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                        <div className="container-fluid pe-0">
                            <Link className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href={route("login")}>
                                Cron Saas
                            </Link>
                            <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon mt-2">
                                    <span className="navbar-toggler-bar bar1"></span>
                                    <span className="navbar-toggler-bar bar2"></span>
                                    <span className="navbar-toggler-bar bar3"></span>
                                </span>
                            </button>
                            <div className="collapse navbar-collapse" id="navigation">
                                <ul className="navbar-nav mx-auto me-xl-auto me-xl-7">

                                    <li className="nav-item">
                                        <Link className={route().current("login") ? "nav-link me-2 text-gradient text-dark fw-bold border-bottom border-dark border-3" : "nav-link me-2"} href={route("login")}>
                                            <i className="fas fa-user-circle opacity-6 text-dark me-1"></i>
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={route().current("register") ? "nav-link me-2 text-gradient text-dark fw-bold border-bottom border-dark border-3" : "nav-link me-2"} href={route("register")}>
                                            <i className="fas fa-key opacity-6 text-dark me-1"></i>
                                            Register
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                </div>
            </div>


        </>
    )
}
