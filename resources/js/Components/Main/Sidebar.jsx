import { Link, useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/react';
import SpinnerButton from './MainComponents/SpinnerButton';
import CurvedImage from "../../../assets/img/curved-images/curved9.jpg"
export default function Sidebar() {

    const { post, processing } = useForm({});

    useEffect(() => {
        if (window.innerWidth < 768) {
            document.body.classList.remove('g-sidenav-pinned');
        }
    }, [usePage().url]);


    const logout = () => {
        post(route('logout'));
    }

    return (
        <>
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3  bg-white" id="sidenav-main">

                <hr className="horizontal dark mt-0" />
                <div className="collapse navbar-collapse h-auto" id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                        <li className="nav-item mt-4">
                            <Link className={route().current("dashboard") ? "nav-link bg-dark rounded text-light" : "nav-link"} href={route("dashboard")}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-house-door-fill fs-5 text-dark"></i>
                                </div>
                                <span className="nav-link-text ms-1">Dashboard</span>
                            </Link>
                        </li>


                        <li className="nav-item mt-4">
                            <Link className={route().current("cron-jobs.*") ? "nav-link bg-dark rounded text-light" : (route().current("cron-job-history.*") ? "nav-link bg-dark rounded text-light" : "nav-link")} href={route("cron-jobs.index")}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-stopwatch-fill fs-5 text-dark"></i>
                                </div>
                                <span className="nav-link-text ms-1">Cron Jobs</span>
                            </Link>
                        </li>



                        <li className="nav-item mt-4">
                            <Link className={route().current("users.*") ? "nav-link bg-dark rounded text-light" : "nav-link"} href={route("users.index")}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-people-fill fs-5 text-dark"></i>
                                </div>
                                <span className="nav-link-text ms-1">Users</span>
                            </Link>
                        </li>





                    </ul>
                </div>


                <div className="sidenav-footer mx-3 mt-7 ">
                    <div className="card card-background shadow-none card-background-mask-secondary" id="sidenavCard">
                        <div className="full-background" style={{ backgroundImage: `url(${CurvedImage})` }}>
                        </div>
                        <div className="card-body text-start p-3 w-100">
                            <div
                                className="icon icon-shape icon-sm bg-white shadow text-center mb-3 d-flex align-items-center justify-content-center border-radius-md">
                                <i className="ni ni-diamond text-dark text-gradient text-lg top-0" aria-hidden="true" id="sidenavCardIcon"></i>
                            </div>
                            <div className="docs-info">
                                <h6 className="text-white up mb-0">Need help?</h6>
                                <p className="text-xs font-weight-bold">Please check our docs</p>
                                <a target="_blank"
                                    className="btn btn-dark btn-sm w-100 mb-0">Documentation</a>
                            </div>
                        </div>
                    </div>
                    <Link className="btn btn-primary mt-3 w-100"
                        href={route("settings.index")}>

                        <i className='bi bi-gear mx-1'></i>
                        Settings

                    </Link>

                    <SpinnerButton
                        Action={logout}
                        CssClass={"btn bg-gradient-dark mt-3 w-100"}
                        processing={processing}
                        ButtonText={"Logout"}
                        Type={"submit"}
                        ButtonIcon={<i className='bi bi-box-arrow-right mx-1'></i>}

                    />
                </div>


            </aside>
        </>
    )
}
