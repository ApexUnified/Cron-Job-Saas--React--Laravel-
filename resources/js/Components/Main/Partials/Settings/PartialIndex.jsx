import { Link } from '@inertiajs/react'
import React from 'react'

export default function PartialIndex() {
    return (
        <>



            <div className="card shadow-md mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">



                            <div className="row my-4">
                                <div className="col-md-6 mb-4">
                                    <div className="card shadow-lg border-0 rounded-3 h-100 transition">
                                        <div className="card-header bg-primary bg-gradient text-white py-3">
                                            <h5 className="mb-0 d-flex align-items-center">
                                                <i className="bi bi-gear-fill me-2"></i>
                                                Application Settings
                                            </h5>
                                        </div>
                                        <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                                                <i className="bi bi-gear-fill text-white fs-3"></i>
                                            </div>
                                            <Link className="btn btn-sm btn-primary">Go To Settings</Link>
                                            <p className="text-center text-muted mb-0">Configure your application preferences and system settings</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="card shadow-lg border-0 rounded-3 h-100">
                                        <div className="card-header bg-success bg-gradient text-white py-3">
                                            <h5 className="mb-0 d-flex align-items-center">
                                                <i className="bi bi-envelope-fill me-2"></i>
                                                SMTP Settings
                                            </h5>
                                        </div>
                                        <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                                            <div className="bg-success rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                                                <i className="bi bi-envelope-fill text-white fs-3"></i>
                                            </div>
                                            <Link className="btn btn-sm btn-success text-dark" href={route("settings.smtp.index")}>Manage SMTP Setting</Link>
                                            <p className="text-center text-muted mb-0">Manage your email notifications and communication preferences</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row my-4">
                                <div className="col-md-6 mb-4">
                                    <div className="card shadow-lg border-0 rounded-3 h-100">
                                        <div className="card-header bg-info bg-gradient text-white py-3">
                                            <h5 className="mb-0 d-flex align-items-center">
                                                <i className="bi bi-card-checklist me-2"></i>
                                                Subscriptions
                                            </h5>
                                        </div>
                                        <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                                            <div className="bg-info rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                                                <i className="bi bi-card-checklist text-white fs-3"></i>
                                            </div>
                                            <Link className="btn btn-sm btn-info text-dark">Manage Subscriptions</Link>
                                            <p className="text-center text-muted mb-0">View and manage your active subscriptions and billing</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="card shadow-lg border-0 rounded-3 h-100">
                                        <div className="card-header bg-warning bg-gradient text-white py-3">
                                            <h5 className="mb-0 d-flex align-items-center">
                                                <i className="bi bi-shield-lock-fill me-2"></i>
                                                Role Permissions
                                            </h5>
                                        </div>
                                        <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                                            <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                                                <i className="bi bi-shield-lock-fill text-white fs-3"></i>
                                            </div>
                                            <Link className="btn btn-sm btn-warning text-dark" href={route("settings.role.index")}>Manage Role & Permissions</Link>
                                            <p className="text-center text-muted mb-0">Configure user roles and access permissions</p>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
