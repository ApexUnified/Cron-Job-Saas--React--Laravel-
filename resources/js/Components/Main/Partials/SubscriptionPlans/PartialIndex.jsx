import { Link, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

export default function PartialIndex() {


    const { subscriptionPlans } = usePage().props;

    console.log(subscriptionPlans);

    const [selectedIds, setSelectedIds] = useState([]);
    const selectAllJobs = () => {

    }

    const selectSingleJob = (id, isChecked) => {

    }

    const handleBulkActions = (type) => {

    }

    const handleDelete = (id) => {

    }


    return (
        <>
            <div className="d-flex justify-content-end flex-wrap">
                <Link href={route('subscription-plans.create')} className="btn btn-dark ">
                    <i className="bi bi-plus-square mx-1"></i>
                    Create Subscription Plan
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
                                <table className="table align-items-center mb-0 text-center">
                                    <thead>
                                        <tr>
                                            <th>

                                                <div className="checkbox-container text-center">
                                                    <label className={`ios-checkbox dark ${subscriptionPlans.data.length == 0 ? 'no-pointer' : ''}`}  >
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
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Plan Name</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Plan Price</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Plan Requests Per Day</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Plan Status</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>



                                        {subscriptionPlans.data.map((plan) => {
                                            return (
                                                <tr key={plan.id}>
                                                    <td>
                                                        <div className="checkbox-container text-center">
                                                            <label className="ios-checkbox red">
                                                                <input type="checkbox"
                                                                    className='cron-job-select'
                                                                    onChange={(e) => selectSingleJob(plan.id, e.target.checked)}
                                                                    name='subscription_plan_id'
                                                                    value={plan.id} />
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

                                                    <td className="align-middle">
                                                        {plan.name}
                                                    </td>

                                                    <td className="align-middle">
                                                        {plan.price}
                                                    </td>

                                                    <td className="align-middle">
                                                        {plan.request_limit_per_day}
                                                    </td>

                                                    <td className="align-middle">
                                                        <span className={`badge badge-sm bg-gradient-${plan.is_active ? "dark" : "danger"}`}>{plan.is_active ? "Enabled" : "Disabled"}</span>
                                                    </td>

                                                    <td className="align-middle">


                                                        <Link href={route('subscription-plans.edit', plan.id)}>
                                                            <i className='bi bi-pencil-fill cursor-pointer text-dark fs-5 mx-1'></i>
                                                        </Link>


                                                        <i className='bi bi-trash-fill cursor-pointer text-dark   rounded fs-5 mx-2' onClick={(() => handleDelete(plan.id))}></i>


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
                                        {subscriptionPlans.links.map((link) => {
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
