import { Link } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/react';
export default function Sidebar() {



    useEffect(() => {
        if (window.innerWidth < 768) {
            document.body.classList.remove('g-sidenav-pinned');
        }
    }, [usePage().url]);

    return (
        <>
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">

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
                            <Link className={route().current("cron-jobs.*") ? "nav-link bg-dark rounded text-light" : "nav-link"} href={route("cron-jobs.index")}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-stopwatch-fill fs-5 text-dark"></i>
                                </div>
                                <span className="nav-link-text ms-1">Cron Jobs</span>
                            </Link>
                        </li>




                    </ul>
                </div>




            </aside>
        </>
    )
}
