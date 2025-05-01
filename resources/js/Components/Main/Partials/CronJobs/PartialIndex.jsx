import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'
import { toast } from 'react-toastify';
export default function PartialIndex({ heading }) {

    const { cronJobs } = usePage().props;
    const { post, processing } = useForm({});

    const ConfirmableToast = (id) => {

        toast(
            ({ closeToast }) => (
                <div style={{
                    padding: '16px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    color: '#333',
                    fontFamily: 'Arial, sans-serif',
                    maxWidth: '300px'
                }}>
                    <p style={{ margin: '0 0 12px', fontWeight: 'bold' }}>Are you sure?</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button
                            onClick={() => { handleDelete(id); closeToast(); }}
                            style={{
                                padding: '6px 12px',
                                color: '#222',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={closeToast}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: 'red',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                draggable: false,
                position: 'top-center',
            }
        );
    }


    const handleDelete = (id) => {
        post(route('cron-jobs.delete', id));
    }

    return (
        <>

            <div className="d-flex justify-content-between flex-wrap">
                <h3>{heading}</h3>
                <Link href={route('cron-jobs.create')} className="btn btn-dark ">
                    <i class="bi bi-plus-square mx-1"></i>
                    Create Cron Job
                </Link>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0 text-center">
                                    <thead>
                                        <tr>
                                            <th>

                                                <div className="checkbox-container">
                                                    <label className={`ios-checkbox dark ${cronJobs.data.length == 0 ? 'no-pointer' : ''}`}  >
                                                        <input type="checkbox" id='cron_job_select_all' />
                                                        <div className="checkbox-wrapper">
                                                            <div className="checkbox-bg"></div>
                                                            <svg className="checkbox-icon" viewBox="0 0 24 24" fill="none">
                                                                <path
                                                                    className="check-path"
                                                                    d="M4 12L10 18L20 6"
                                                                    stroke="currentColor"
                                                                    strokeWidth="3"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </label>
                                                </div>

                                            </th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title, URL</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Last Execution</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Method</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {cronJobs.data.map((cronJob) => {

                                            <tr>
                                                <td>
                                                    <div className="checkbox-container">
                                                        <label className="ios-checkbox red">
                                                            <input type="checkbox" name='cronJob_id' value={cronJob.id} />
                                                            <div className="checkbox-wrapper">
                                                                <div className="checkbox-bg"></div>
                                                                <svg className="checkbox-icon" viewBox="0 0 24 24" fill="none">
                                                                    <path
                                                                        className="check-path"
                                                                        d="M4 12L10 18L20 6"
                                                                        stroke="currentColor"
                                                                        strokeWidth="3"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    ></path>
                                                                </svg>
                                                            </div>
                                                        </label>
                                                    </div>


                                                </td>
                                                <td>
                                                    <div className="d-flex px-2 py-1 justify-content-center">
                                                        <div className="d-flex flex-column justify-content-center align-items-center flex-wrap">
                                                            <h6 className="mb-0 text-sm">{cronJob.title} </h6>
                                                            <p className="text-xs text-secondary mb-0"> <i className='bi bi-stopwatch-fill fs-5 text-dark'></i>{cronJob.url}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">{cronJob.last_execution}</p>

                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="badge badge-sm bg-gradient-secondary">{cronJob.method}</span>
                                                </td>

                                                <td className="align-middle text-center text-sm">
                                                    <span className={`badge badge-sm bg-gradient-${cronJob.is_enabled ? "success" : "danger"}`}>{cronJob.is_enabled ? "Enabled" : "Disabled"}</span>
                                                </td>

                                                <td className="align-middle">
                                                    <Link href={route('cronJob.edit', cronJob.id)}><i className='bi bi-pencil-fill cursor-pointer text-light bg-dark rounded p-2'></i></Link>

                                                    <Link href={route('cron-jobs.show', cronJob.id)} className="btn btn-dark mx-2">
                                                        <i className="bi bi-clock-history mx-1"></i>
                                                    </Link>

                                                    <i className='bi bi-trash-fill cursor-pointer  text-light bg-dark rounded p-2 mx-2' onClick={(() => ConfirmableToast(cronJob.id))}></i>

                                                </td>
                                            </tr>

                                        })


                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
