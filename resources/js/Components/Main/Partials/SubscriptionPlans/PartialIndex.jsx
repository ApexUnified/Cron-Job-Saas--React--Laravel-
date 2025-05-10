import { Link, router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2';

export default function PartialIndex() {


    const { subscriptionPlans } = usePage().props;


    const [selectedIds, setSelectedIds] = useState([]);

    const selectAllJobs = () => {
        const allSelectedjobs = document.querySelectorAll(".subscription-plan-select");
        const ids = [];
        allSelectedjobs.forEach((el) => {
            el.checked = document.getElementById("subscription-plan-select_all").checked;
            if (el.checked) {
                ids.push(el.value);
            }

            setSelectedIds(ids);
        });
    }

    const unSelectAfterAction = () => {
        const allSelectedjobs = document.querySelectorAll(".subscription-plan-select");
        const parentcheckBox = document.getElementById("subscription-plan-select_all").checked = false;
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
                title: 'Are you sure You Want To Delete All The Selected Subscription Plans?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unSelectAfterAction();
                    router.delete(route('subscription-plans.deletebyselection'), {
                        preserveScroll: true,
                        data: {
                            subscription_plan_ids: selectedIds
                        }
                    });
                }
            });
        }

        if (type === "Disable") {
            Swal.fire({
                title: 'Are you sure You Want To Disable All The Selected Subscription Plans?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Disable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unSelectAfterAction();
                    router.patch(route('subscription-plans.disablebyselection'), {
                        preserveScroll: true,
                        data: {
                            subscription_plan_ids: selectedIds
                        }
                    });
                }
            });
        }
        if (type === "Enable") {
            Swal.fire({
                title: 'Are you sure You Want To Enable All The Selected Subscription Plans?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Enable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unSelectAfterAction();
                    router.patch(route('subscription-plans.enablebyselection'), {
                        preserveScroll: true,
                        data: {
                            subscription_plan_ids: selectedIds
                        }
                    });
                }
            });
        }







    }
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure You Want To Delete This Subscription Plan?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#222',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('subscription-plans.destroy', id));
            }
        })
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
                                                        <input type="checkbox" id='subscription-plan-select_all' onClick={selectAllJobs} />
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
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Plan Premium Support</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Plan Max Cron Jobs</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Plan Max Failed Job B-Disable</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Plan Status</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>



                                        {subscriptionPlans.data.map((plan) => {
                                            return (
                                                <tr key={plan.id}>
                                                    {plan.id != 1 ?

                                                        <td>
                                                            <div className="checkbox-container text-center">
                                                                <label className="ios-checkbox red">
                                                                    <input type="checkbox"
                                                                        className='subscription-plan-select'
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

                                                        :

                                                        <td><span className="badge bg-danger">Action Disabled</span></td>
                                                    }

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
                                                        <span className={` fw-bold badge bg-${plan.premium_customer_support ? "dark" : "danger"}`}>
                                                            {plan.premium_customer_support ? "Yes" : "No"}
                                                        </span>
                                                    </td>


                                                    <td className="align-middle">
                                                        {plan.max_cron_jobs}
                                                    </td>

                                                    <td className="align-middle">
                                                        {plan.max_job_failed_before_disable}
                                                    </td>


                                                    <td className="align-middle">
                                                        <span className={`badge badge-sm bg-gradient-${plan.is_active ? "dark" : "danger"}`}>{plan.is_active ? "Enabled" : "Disabled"}</span>
                                                    </td>

                                                    <td className="align-middle">


                                                        <Link href={route('subscription-plans.edit', plan.id)}>
                                                            <i className='bi bi-pencil-fill cursor-pointer text-dark fs-5 mx-1'></i>
                                                        </Link>


                                                        {plan.id != 1 &&

                                                            <i className='bi bi-trash-fill cursor-pointer text-dark   rounded fs-5 mx-2' onClick={(() => handleDelete(plan.id))}></i>
                                                        }


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
