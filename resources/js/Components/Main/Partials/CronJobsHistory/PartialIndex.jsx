import { Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function PartialIndex() {

    const { cronJobHistory } = usePage().props;




    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-body px-0 pt-0 pb-2">

                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0 text-left">
                                    <thead>
                                        <tr>

                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">CronJob Title / URL</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status Code</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Execution Duration</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Response</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {cronJobHistory.data.map((history) => {
                                            // return (
                                            //     <tr key={history.id}>

                                            //         <td>
                                            //             <div className="d-flex px-2 py-1 justify-content-start text-left">
                                            //                 <div className="d-flex flex-column justify-content-center align-items-center flex-wrap">
                                            //                     <h6 className="mb-0 text-sm">{history.title} </h6>
                                            //                     <p className="text-xs text-secondary mb-0"> <i className={`bi bi-stopwatch-fill fs-5 mx-2  text-${cronJob.is_schedule_expired ? "danger" : "success"}`}></i><a href={cronJob.url} target="_blank">{cronJob.url.slice(0, 20) + "..."}</a></p>
                                            //                 </div>
                                            //             </div>
                                            //         </td>
                                            //         <td>
                                            //             <p className="text-xs font-weight-bold mb-0">{cronJob.last_execution || "No Execution Found"}</p>

                                            //         </td>
                                            //         <td className="align-middle text-sm">
                                            //             <span className="badge badge-sm bg-gradient-dark text-white">{cronJob.method}</span>
                                            //         </td>

                                            //         <td className="align-middle text-sm">
                                            //             <span className={`badge badge-sm bg-gradient-${cronJob.is_enabled ? "dark" : "danger"}`}>{cronJob.is_enabled ? "Enabled" : "Disabled"}</span>
                                            //         </td>

                                            //         <td className="align-middle text-sm">




                                            //             <Link href={route('cron-jobs.edit', cronJob.id)}>
                                            //                 <i className='bi bi-pencil-fill cursor-pointer text-dark fs-5 mx-1'></i>
                                            //             </Link>

                                            //             <Link href={route('cron-job-history.index', cronJob.id)}>
                                            //                 <i className="bi bi-clock-history mx-1 fs-5 cursor-pointer text-dark mx-1"></i>
                                            //             </Link>

                                            //             <i className='bi bi-trash-fill cursor-pointer text-dark   rounded fs-5 mx-2' onClick={(() => ConfirmableToast(cronJob.id))}></i>


                                            //         </td>
                                            //     </tr>
                                            // )


                                        })


                                        }

                                    </tbody>
                                </table>
                            </div>


                            {/* <div className="row mt-4">
                                <div className="col-md-12 d-flex justify-content-end flex-wrap">
                                    <div className="pagination">
                                        {cronJobs.links.map((link) => {
                                            return (
                                                <Link key={link.label} className={`btn btn-outline-dark mx-1 ${link.url ? "" : "disabled"} ${link.active ? "active disabled bg-dark text-white" : ""}`}
                                                    href={link.url || ""}>
                                                    <div dangerouslySetInnerHTML={{ __html: link.label }}></div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div> */}

                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}
