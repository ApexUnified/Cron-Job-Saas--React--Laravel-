import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'
import notificationIcon1 from "../../../assets/img/team-2.jpg";
import notificationIcon2 from "../../../assets/img/team-3.jpg";
export default function Main({ children, header }) {

    const { auth } = usePage().props;

    const { post, processing } = useForm({});
    const logout = () => {
        post(route('logout'));
    }

    const iconNavbarSidenav = () => {
        const sidenav = document.getElementById('sidenav-main');
        const body = document.body;
        const isPinned = body.classList.contains('g-sidenav-pinned');

        if (isPinned) {
            body.classList.remove('g-sidenav-pinned');
            if (sidenav) {
                sidenav.classList.remove('bg-white');
                sidenav.classList.add('bg-transparent');
            }
        } else {
            body.classList.add('g-sidenav-pinned');
            if (sidenav) {
                sidenav.classList.add('bg-white');
                sidenav.classList.remove('bg-transparent');
            }
        }
    };




    return (
        <>
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

                <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                    <div className="container-fluid py-1 px-3">
                        <nav aria-label="breadcrumb" className='mt-3'>
                            {header}
                        </nav>
                        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                            </div>
                            <ul className="navbar-nav  justify-content-end">

                                <li className="nav-item d-flex align-items-center">
                                    <button className="nav-link text-body font-weight-bold px-0" onClick={logout}>
                                        {processing ?
                                            <div className="spinner-border spinner-border-sm" role="status">
                                            </div>
                                            :
                                            <>
                                                <i className="bi bi-box-arrow-right mx-1 mt-2"></i>
                                                <span className="d-sm-inline d-none">Logout</span>
                                            </>
                                        }
                                    </button>
                                </li>
                                <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                    <a href="#" className="nav-link text-body p-0" onClick={iconNavbarSidenav}>
                                        <div className="sidenav-toggler-inner">
                                            <i className="sidenav-toggler-line"></i>
                                            <i className="sidenav-toggler-line"></i>
                                            <i className="sidenav-toggler-line"></i>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item px-3 d-flex align-items-center">
                                    <Link href={route("settings.index")} className="nav-link text-body p-0">
                                        <i className="bi bi-gear fixed-plugin-button-nav cursor-pointer"></i>
                                    </Link>
                                </li>

                                <div className="d-md-flex d-none">
                                    <li className="nav-item dropdown pe-2 d-flex align-items-center ">
                                        <a href="#" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-bell cursor-pointer"></i>
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                                            {auth.notifications.length > 0 ?
                                                <>
                                                    {
                                                        auth.notifications.map((notification, index) => (
                                                            <div key={index + 1}>
                                                                <li className="mb-2">
                                                                    <a className="dropdown-item border-radius-md" href="#">
                                                                        <div className="d-flex py-1">
                                                                            <div className="my-auto">
                                                                                <img src={notificationIcon2} className="avatar avatar-sm  me-3 " />
                                                                            </div>
                                                                            <div className="d-flex flex-column justify-content-center">
                                                                                <h6 className="text-sm font-weight-normal mb-1">
                                                                                    <span className="font-weight-bold">New message</span> from System
                                                                                </h6>
                                                                                <p>{notification["data"]["message"]}</p>
                                                                                <p className="text-xs text-secondary mb-0 ">
                                                                                    <i className="fa fa-clock me-1"></i>
                                                                                    {notification.human_created_at}
                                                                                </p>

                                                                            </div>
                                                                        </div>
                                                                    </a>

                                                                </li>
                                                            </div>
                                                        ))
                                                    }
                                                    <p className='text-center'>
                                                        <Link className='text-primary'>See More</Link>
                                                    </p>
                                                </>
                                                :
                                                "No Notification Found"

                                            }

                                        </ul>
                                    </li>
                                </div>

                            </ul>
                        </div>
                    </div>
                </nav>



                <div className="container-fluid py-4">
                    {children}
                    <footer className="footer pt-3 mt-6">
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-lg-between">
                                <div className="col-lg-6 mb-lg-0 mb-4">
                                    <div className="copyright text-center text-sm text-muted text-lg-start">
                                        ©
                                        {new Date().getFullYear() + " "}
                                        made By
                                        <Link href="http://sheikhabdullah-001-site1.ptempurl.com" className="font-weight-bold mx-2" target="_blank">Sheikh Abdullah</Link>
                                        for a better Cron Job Experience.
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    {/* <ul className="nav nav-footer justify-content-center justify-content-lg-end">

                                        <li className="nav-item">
                                            <Link href="https://www.creative-tim.com/presentation" className="nav-link text-muted" target="_blank">About Us</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="https://www.creative-tim.com/blog" className="nav-link text-muted" target="_blank">Blog</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted" target="_blank">License</Link>
                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </>
    )
}
