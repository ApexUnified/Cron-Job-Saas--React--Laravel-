import { Link, useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/react';
import SpinnerButton from './MainComponents/SpinnerButton';
import CurvedImage from "../../../assets/img/curved-images/curved9.jpg"
export default function Sidebar() {

    const { post, processing } = useForm({});
    const { auth } = usePage().props;


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
                                    <i className="bi bi-house-door fs-5 text-dark"></i>
                                </div>
                                <span className="nav-link-text ms-1">Dashboard</span>
                            </Link>
                        </li>


                        <li className="nav-item mt-4">
                            <Link className={route().current("cron-jobs.*") ? "nav-link bg-dark rounded text-light" : (route().current("cron-job-history.*") ? "nav-link bg-dark rounded text-light" : "nav-link")} href={route("cron-jobs.index")}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-stopwatch fs-5 text-dark"></i>
                                </div>
                                <span className="nav-link-text ms-1">Cron Jobs</span>
                            </Link>
                        </li>



                        <li className="nav-item mt-4">
                            <Link className={route().current("users.*") ? "nav-link bg-dark rounded text-light" : "nav-link"} href={route("users.index")}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-people fs-5 text-dark"></i>
                                </div>
                                <span className="nav-link-text ms-1">Users</span>
                            </Link>
                        </li>

                        <li className="nav-item mt-4">
                            <Link className={route().current("subscription-plans.*") ? "nav-link bg-dark rounded text-light" : "nav-link"} href={route("subscription-plans.index")}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-gem fs-5 text-dark"></i>
                                </div>
                                <span className="nav-link-text ms-1">Subscription Plans</span>
                            </Link>
                        </li>


                        <li className="nav-item my-4">
                            <Link className={route().current("settings.*") ? "nav-link bg-dark rounded text-light" : "nav-link"} href={route("settings.index")}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-gear fs-5 text-dark"></i>
                                </div>
                                <span className="nav-link-text ms-1">Settings</span>
                            </Link>
                        </li>







                    </ul>
                </div>


                <div className="sidenav-footer mx-3 custom-sidebar-footer-adjustment">
                    <div className="d-flex align-items-center mb-2">
                        <div className="rounded-circle bg-dark text-white text-center" style={{ minWidth: "40px", minHeight: "40px", lineHeight: "40px" }}>
                            {auth.user.user_avatar}
                        </div>
                        <div className="text-truncate mx-1" style={{ lineHeight: "1.2" }}>
                            <strong style={{ fontSize: "14px" }}>{auth.user.name}</strong>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>
                                {auth.user.email.substring(0, auth.user.email.indexOf("@"))}
                            </div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>
                                Plan: <span className="fw-semibold text-dark">{auth.user.subscription_plan || 'Free'}</span>
                            </div>
                        </div>
                    </div>


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
