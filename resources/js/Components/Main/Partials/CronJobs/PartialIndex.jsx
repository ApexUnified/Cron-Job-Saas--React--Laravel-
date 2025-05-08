import { Link, router, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
export default function PartialIndex({ heading }) {

    const { cronJobs } = usePage().props;
    const { post, processing } = useForm({});
    const [selectedIds, setSelectedIds] = useState([]);


    const ConfirmableToast = (id) => {

        Swal.fire({
            title: 'Are you sure You Want To Delete This Cron Job?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#222',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
            }
        })
    }


    const handleDelete = (id) => {
        post(route('cron-jobs.destroy', id), {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        });
    }


    const selectAllJobs = () => {
        const allSelectedjobs = document.querySelectorAll(".cron-job-select");
        const ids = [];
        allSelectedjobs.forEach((el) => {
            el.checked = document.getElementById("cron_job_select_all").checked;
            if (el.checked) {
                ids.push(el.value);
            }

            setSelectedIds(ids);
        });
    }

    const unSelectAfterAction = () => {
        const allSelectedjobs = document.querySelectorAll(".cron-job-select");
        const parentcheckBox = document.getElementById("cron_job_select_all").checked = false;
        allSelectedjobs.forEach((el) => {
            el.checked = false;
        });
        setSelectedIds([]);
    }



    const selectSingleJob = (id, isChecked) => {
        if (isChecked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(item => item !== id));
        }
    };


    const handleBulkActions = (type) => {

        if (type === "Delete") {
            Swal.fire({
                title: 'Are you sure You Want To Delete All The Selected Jobs?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unSelectAfterAction();
                    router.delete(route('cron-jobs.deletebyselection'), {
                        preserveScroll: true,
                        data: {
                            cron_job_ids: selectedIds
                        }
                    });
                }
            });
        }

        if (type === "Disable") {
            Swal.fire({
                title: 'Are you sure You Want To Disable All The Selected Jobs?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Disable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unSelectAfterAction();
                    router.patch(route('cron-jobs.disablebyselection'), {
                        preserveScroll: true,
                        data: {
                            cron_job_ids: selectedIds
                        }
                    });
                }
            });
        }
        if (type === "Enable") {
            Swal.fire({
                title: 'Are you sure You Want To Enable All The Selected Jobs?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Enable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unSelectAfterAction();
                    router.patch(route('cron-jobs.enablebyselection'), {
                        preserveScroll: true,
                        data: {
                            cron_job_ids: selectedIds
                        }
                    });
                }
            });
        }
        if (type === "Copy") {
            Swal.fire({
                title: 'Are you sure You Want To Copy All The Selected Jobs?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Copy it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unSelectAfterAction();
                    router.post(route('cron-jobs.bulk.copy'), {
                        preserveScroll: true,
                        data: {
                            cron_job_ids: selectedIds
                        }
                    });
                }
            });
        }






    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap">
                <h3>{heading}</h3>
                <Link href={route('cron-jobs.create')} className="btn btn-dark ">
                    <i className="bi bi-plus-square mx-1"></i>
                    Create Cron Job
                </Link>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-body px-0 pt-0 pb-2">
                            {selectedIds.length > 0 &&

                                <div className="d-flex justify-content-start flex-wrap mx-5">
                                    <div className="dropdown px-3">
                                        <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical fs-4"></i>
                                        </a>
                                        <ul className="dropdown-menu px-2 py-3" aria-labelledby="dropdownTable">
                                            <li><a className="dropdown-item border-radius-md" onClick={() => handleBulkActions("Delete")}><i className='bi bi-trash text-danger mx-1'></i>Delete </a></li>
                                            <li><a className="dropdown-item border-radius-md" onClick={() => handleBulkActions("Enable")}><i className='bi bi-toggle-on text-success mx-1'></i >Enable</a></li>
                                            <li><a className="dropdown-item border-radius-md" onClick={() => handleBulkActions("Disable")}><i className='bi bi-toggle-off text-primary mx-1'></i>Disable</a></li>
                                            <li><a className="dropdown-item border-radius-md" onClick={() => handleBulkActions("Copy")}><i className='bi bi-clipboard-check text-primary mx-1'></i>Copy</a></li>
                                        </ul>
                                    </div>
                                </div>

                            }
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0 text-left">
                                    <thead>
                                        <tr>
                                            <th>

                                                <div className="checkbox-container text-center">
                                                    <label className={`ios-checkbox dark ${cronJobs.data.length == 0 ? 'no-pointer' : ''}`}  >
                                                        <input type="checkbox" id='cron_job_select_all' onClick={selectAllJobs} />
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
                                            return (
                                                <tr key={cronJob.id}>
                                                    <td>
                                                        <div className="checkbox-container text-center">
                                                            <label className="ios-checkbox red">
                                                                <input type="checkbox"
                                                                    className='cron-job-select'
                                                                    onChange={(e) => selectSingleJob(cronJob.id, e.target.checked)}
                                                                    name='cronJob_id'
                                                                    value={cronJob.id} />
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
                                                        <div className="d-flex px-2 py-1 justify-content-start text-left">
                                                            <div>
                                                                <h6 className="mb-0 text-sm">{cronJob.title} </h6>
                                                                <p> <i className={`bi bi-stopwatch-fill fs-5 mx-2  text-${cronJob.is_schedule_expired ? "danger" : "success"}`}></i><a href={cronJob.url} target="_blank">{cronJob.url.slice(0, 20) + "..."}</a></p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>{cronJob.last_execution || "No Execution Found"}</p>
                                                        {cronJob.last_execution ? <p>Took <span className='text-primary'>{cronJob.execution_duration}</span> Seconds</p> : ""}

                                                    </td>
                                                    <td className="align-middle">
                                                        <span className="badge badge-sm bg-gradient-dark text-white">{cronJob.method}</span>
                                                    </td>

                                                    <td className="align-middle">
                                                        <span className={`badge badge-sm bg-gradient-${cronJob.is_enabled ? "dark" : "danger"}`}>{cronJob.is_enabled ? "Enabled" : "Disabled"}</span>
                                                    </td>

                                                    <td className="align-middle">


                                                        <Link href={route('cron-jobs.edit', cronJob.id)}>
                                                            <i className='bi bi-pencil-fill cursor-pointer text-dark fs-5 mx-1'></i>
                                                        </Link>

                                                        <Link href={route('cron-job-history.index', cronJob.id)}>
                                                            <i className="bi bi-clock-history mx-1 fs-5 cursor-pointer text-dark mx-1"></i>
                                                        </Link>

                                                        <i className='bi bi-trash-fill cursor-pointer text-dark   rounded fs-5 mx-2' onClick={(() => ConfirmableToast(cronJob.id))}></i>


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
                                        {cronJobs.links.map((link) => {
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
