import { Link } from '@inertiajs/react'
import React, { useEffect } from 'react'
import SidebarLogo from "../../../assets/img/logo-ct-dark.png"

export default function Sidebar() {

    return (
        <>
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
                <div className="sidenav-header">
                    <i className="bi bi-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                    <Link className="navbar-brand m-0" href={route("dashboard")} target="_blank">
                        <img src={SidebarLogo} className="navbar-brand-img h-100" alt="main_logo" />
                        <span className="ms-1 font-weight-bold">Cron Saas</span>
                    </Link>
                </div>
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

                    </ul>
                </div>




            </aside>
        </>
    )
}
