import { Link, router, useForm, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2';

export default function PartialIndex() {
    const { subscriptions } = usePage().props;

    const [selectedIds, setSelectedIds] = useState([]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure You Want To Delete This Subscription?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#222',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('subscriptions.destroy', id));
            }
        });
    }


    const selectAllJobs = () => {
        const allSelectedjobs = document.querySelectorAll(".subscription-select");
        const ids = [];
        allSelectedjobs.forEach((el) => {
            el.checked = document.getElementById("subscription_select_all").checked;
            if (el.checked) {
                ids.push(el.value);
            }

            setSelectedIds(ids);
        });
    }

    const unSelectAfterAction = () => {
        const allSelectedjobs = document.querySelectorAll(".subscription-select");
        const parentcheckBox = document.getElementById("subscription_select_all").checked = false;
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
                title: 'Are you sure You Want To Delete All The Selected Subscriptions?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unSelectAfterAction();
                    router.delete(route('subscriptions.deletebyselection'), {
                        preserveScroll: true,
                        data: {
                            subscription_ids: selectedIds
                        }
                    });
                }
            });
        }

        if (type === "Disable") {
            Swal.fire({
                title: 'Are you sure You Want To Disable All The Selected Subscriptions?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Disable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unSelectAfterAction();
                    router.patch(route('subscriptions.disablebyselection'), {
                        preserveScroll: true,
                        data: {
                            subscription_ids: selectedIds
                        }
                    });
                }
            });
        }
        if (type === "Enable") {
            Swal.fire({
                title: 'Are you sure You Want To Enable All The Selected Subscriptions?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Enable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    unSelectAfterAction();
                    router.patch(route('subscriptions.enablebyselection'), {
                        preserveScroll: true,
                        data: {
                            subscription_ids: selectedIds
                        }
                    });
                }
            });
        }


    }
    return (
        <>
            <div className="d-flex justify-content-end flex-wrap">
                <Link href={route('subscriptions.create')} className="btn btn-dark ">
                    <i className="bi bi-plus-square mx-1"></i>
                    Create Subscription
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
                                                    <label className={`ios-checkbox dark ${subscriptions.data.length == 0 ? 'no-pointer' : ''}`}  >
                                                        <input type="checkbox" id='subscription_select_all' onClick={selectAllJobs} />
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
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User Name</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Plan Name</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Subscription Start Date</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Subscription End Date</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Subscription Status</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Subscription Auto Renew</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Subscription Active Status</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {subscriptions.data.map((subscription) => {
                                            return (
                                                <tr key={subscription.id}>
                                                    <td>
                                                        <div className="checkbox-container text-center">
                                                            <label className="ios-checkbox red">
                                                                <input type="checkbox"
                                                                    className='subscription-select'
                                                                    onChange={(e) => selectSingleJob(subscription.id, e.target.checked)}
                                                                    name='subscription_id'
                                                                    value={subscription.id} />
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
                                                        {subscription.user.name.length > 15 ? subscription.user.name.substring(0, 15) + "..." : subscription.user.name}
                                                    </td>



                                                    <td className="align-middle">
                                                        <span className="badge bg-gradient-dark">{subscription.subscription_plan.name}</span>
                                                    </td>

                                                    <td className="align-middle">
                                                        {subscription.start_date}
                                                    </td>

                                                    <td className="align-middle">
                                                        {subscription.end_date}
                                                    </td>

                                                    <td className="align-middle">
                                                        <span className={`badge bg-${subscription.status === 'Active' ? 'gradient-dark' : 'danger'}`}>{subscription.status}</span>
                                                    </td>

                                                    <td className="align-middle">
                                                        <span className={`badge bg-${subscription.auto_renew == 1 ? 'gradient-dark' : 'danger'}`}>{subscription.auto_renew == 1 ? "Enabled" : "Disabled"}</span>
                                                    </td>

                                                    <td className="align-middle">
                                                        <span className={`badge bg-${subscription.is_active == 1 ? 'gradient-dark' : 'danger'}`}>{subscription.is_active == 1 ? "Enabled" : "Disabled"}</span>
                                                    </td>


                                                    <td className="align-middle">


                                                        <Link href={route('subscriptions.edit', subscription.id)}>
                                                            <i className='bi bi-pencil-fill cursor-pointer text-dark fs-5 mx-1'></i>
                                                        </Link>



                                                        <i className='bi bi-trash-fill cursor-pointer text-dark   rounded fs-5 mx-2' onClick={(() => handleDelete(subscription.id))}></i>


                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>


                            <div className="row mt-4">
                                <div className="col-md-12 d-flex justify-content-end flex-wrap">
                                    <div className="pagination">
                                        {subscriptions.links.map((link) => {
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
