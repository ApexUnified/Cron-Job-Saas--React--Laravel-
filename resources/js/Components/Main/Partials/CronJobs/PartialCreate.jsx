import { Link } from '@inertiajs/react'
import React from 'react'

export default function PartialCreate({ heading }) {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap">
                <h3>{heading}</h3>
                <Link href={route('cron-jobs.index')} className="btn btn-dark ">
                    <i className="bi bi-arrow-bar-left mx-1"></i>
                    Back To CronJob
                </Link>
            </div>


            <form>
                <div className="row my-3">
                    <div className="col-md-12">
                        <div className="card shadow-lg">
                            <div className="card-body">

                                <div className="mb-1">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">URL</label>
                                    <input type="text" className="form-control" />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>


                <div className="row my-3">
                    <div className="col-md-12">
                        <div className="card shadow-lg">
                            <div className="card-header">
                                <h6>Execution Schedule</h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8"></div>
                                    <div className="col-md-4">
                                        <p>Hello World</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
