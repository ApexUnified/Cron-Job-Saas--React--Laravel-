import { Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function PartialDashboard() {

    const { success_jobs, todays_total_requests, failed_jobs, total_jobs, todays_total_failed_requests, todays_total_success_requests } = usePage().props;



    return (
        <>

            <div className="d-flex justify-content-end flex-wrap">
                <Link href={route("cron-jobs.create")} className='btn btn-dark'>
                    <i className="bi bi-plus-square mx-1"></i>
                    Create Cron Job</Link>
            </div>
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="row  justify-content-center">
                        <div className="col-lg-4 col-md-6 col-12 mt-md-0">
                            <div className="card shadow-lg">
                                <span className="mask bg-gradient-warning opacity-10 border-radius-lg"></span>
                                <div className="card-body p-3 position-relative">
                                    <div className="row">
                                        <div className="col-8 text-start">
                                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                                <i class="bi bi-emoji-wink text-dark fs-5"></i>
                                            </div>
                                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                                {total_jobs}
                                            </h5>
                                            <span className="text-white text-sm">Total Jobs</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12 mt-4 mt-md-0">
                            <div className="card shadow-lg">
                                <span className="mask bg-gradient-success opacity-6 border-radius-lg"></span>
                                <div className="card-body p-3 position-relative">
                                    <div className="row">
                                        <div className="col-8 text-start">
                                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                                <i class="bi bi-emoji-heart-eyes text-dark fs-5"></i>
                                            </div>
                                            <h5 className="text-dark font-weight-bolder mb-0 mt-3">
                                                {success_jobs}
                                            </h5>
                                            <span className="text-dark text-sm">Successful Jobs</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12 mt-4 mt-lg-0 my-sm-3">
                            <div className="card shadow-lg">
                                <span className="mask bg-gradient-danger opacity-10 border-radius-lg"></span>
                                <div className="card-body p-3 position-relative">
                                    <div className="row">
                                        <div className="col-8 text-start">
                                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                                <i class="bi bi-emoji-dizzy text-dark fs-5"></i>
                                            </div>
                                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                                {failed_jobs}
                                            </h5>
                                            <span className="text-white text-sm">Failed Jobs</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>






                    </div>

                </div>

            </div>


            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="row  justify-content-center">
                        <div className="col-lg-4 col-md-6 col-12 mt-4 mt-lg-0 my-sm-3">
                            <div className="card shadow-lg">
                                <span className="mask bg-gradient-danger opacity-10 border-radius-lg"></span>
                                <div className="card-body p-3 position-relative">
                                    <div className="row">
                                        <div className="col-8 text-start">
                                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                                <i class="bi bi-emoji-dizzy text-dark fs-5"></i>
                                            </div>
                                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                                {todays_total_requests}
                                            </h5>
                                            <span className="text-white text-sm">Total Requests Hit Today</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="col-lg-4 col-md-6 col-12 mt-4 mt-md-0">
                            <div className="card shadow-lg">
                                <span className="mask bg-gradient-success opacity-6 border-radius-lg"></span>
                                <div className="card-body p-3 position-relative">
                                    <div className="row">
                                        <div className="col-8 text-start">
                                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                                <i class="bi bi-emoji-heart-eyes text-dark fs-5"></i>
                                            </div>
                                            <h5 className="text-dark font-weight-bolder mb-0 mt-3">
                                                {todays_total_success_requests}
                                            </h5>
                                            <span className="text-dark text-sm">Total Successful Jobs Today</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-4 col-md-6 col-12 mt-4 mt-md-0">
                            <div className="card shadow-lg">
                                <span className="mask bg-gradient-danger opacity-6 border-radius-lg"></span>
                                <div className="card-body p-3 position-relative">
                                    <div className="row">
                                        <div className="col-8 text-start">
                                            <div className="icon icon-shape bg-white shadow text-center border-radius-2xl">
                                                <i class="bi bi-emoji-heart-eyes text-dark fs-5"></i>
                                            </div>
                                            <h5 className="text-white font-weight-bolder mb-0 mt-3">
                                                {todays_total_failed_requests}
                                            </h5>
                                            <span className="text-white text-sm">Total Failed Jobs Today</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>











                    </div>

                </div>

            </div>


            <div className="row">
                <div className="col-md-12">

                </div>
            </div>

        </>
    )
}
