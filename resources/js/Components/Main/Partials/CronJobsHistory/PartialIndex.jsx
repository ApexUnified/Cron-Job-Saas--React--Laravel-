import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';




export default function PartialIndex() {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const { cronJobHistory } = usePage().props;
    const { cron_success_cron_jobs_count } = usePage().props;
    const { cron_failed_cron_jobs_count } = usePage().props;

    const data = {
        labels: ["Cron Job Insights"],
        datasets: [
            {
                label: 'Success',
                data: [cron_success_cron_jobs_count],
                backgroundColor: 'rgba(14, 161, 51, 0.6)',
                borderColor: 'rgba(82, 160, 63, 0.56)',
                borderWidth: 1,
            },

            {
                label: 'Failed',
                data: [cron_failed_cron_jobs_count],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(167, 63, 86, 0.36)',
                borderWidth: 1,
            },

        ],
    };


    return (
        <>

            <div className="d-flex justify-content-end flex-wrap">
                <Link href={route('cron-jobs.index')} className='btn bg-gradient-dark '>  <i className="bi bi-arrow-bar-left mx-1"></i> Back To Cron Jobs</Link>
            </div>


            <div className="row mb-5">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-body px-0 pt-0 pb-2">

                            <Bar data={data} />


                        </div>

                    </div>

                </div>
            </div>


            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-body px-0 pt-0 pb-2">

                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0 ">
                                    <thead className='text-center'>
                                        <tr>

                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">CronJob Title / URL</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status Code</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Execution Duration</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Error</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Executed At</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>


                                        {cronJobHistory.data.map((history) => {
                                            return (
                                                <tr key={history.id}>

                                                    <td>
                                                        <div className="d-flex px-2 py-1 justify-content-center">
                                                            <div className="d-flex flex-column justify-content-center align-items-center flex-wrap">
                                                                <h6 className="mb-0 text-sm">{history.cron_job.title || ""} </h6>
                                                                <p className="text-xs text-secondary mb-0"> <i className={`bi bi-stopwatch-fill fs-5 mx-2`}></i><a href={history.cron_job.url} target="_blank">{history.cron_job.url.slice(0, 20) + "..."}</a></p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className={`text-xs font-weight-bold mb-0 badge bg-${history.status == "success" ? "success" : "danger"}`}>{history.status}</p>
                                                    </td>

                                                    <td>
                                                        <p className={`text-xs font-weight-bold mb-0 badge bg-${history.status_code == 200 ? "success" : "danger"}`}>{history.status_code}</p>
                                                    </td>
                                                    <td className="align-middle text-sm">
                                                        <span className="badge badge-sm bg-gradient-dark text-white">{history.execution_duration} Seconds</span>
                                                    </td>

                                                    <td className="align-middle text-sm">
                                                        <span className={`badge badge-sm bg-${history.error_message ? "danger" : "success"} text-white`}>{history.error_message || "No Error"}</span>
                                                    </td>

                                                    <td className="align-middle text-sm">
                                                        <span>{history.executed_at}</span>
                                                    </td>

                                                </tr>
                                            )


                                        })


                                        }

                                    </tbody>
                                </table>
                            </div>


                            <div className="row mt-4">
                                <div className="col-md-12 d-flex justify-content-end flex-wrap">
                                    <div className="pagination">
                                        {cronJobHistory.links.map((link) => {
                                            return (
                                                <Link preserveScroll key={link.label} className={`btn btn-outline-dark mx-1 ${link.url ? "" : "disabled"} ${link.active ? "active disabled bg-dark text-white" : ""}`}
                                                    href={link.url || ""}>
                                                    <div dangerouslySetInnerHTML={{ __html: link.label }}></div>
                                                </Link>
                                            )
                                        })}
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
