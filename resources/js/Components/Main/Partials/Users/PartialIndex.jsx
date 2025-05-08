import { Link, router, usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

export default function PartialIndex() {

    const { users } = usePage().props;
    const { auth } = usePage().props;
    const [selectedIds, setSelectedIds] = useState([]);



    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure You Want To Delete This User?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#222',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('users.destroy', id));
            }
        })

    }


    const selectAllJobs = () => {
        const allSelectedjobs = document.querySelectorAll(".user-select");
        const ids = [];
        allSelectedjobs.forEach((el) => {
            el.checked = document.getElementById("users_select_all").checked;
            if (el.checked) {
                ids.push(el.value);
            }

            setSelectedIds(ids);
        });
    }

    const unSelectAfterAction = () => {
        const allSelectedjobs = document.querySelectorAll(".user-select");
        const parentcheckBox = document.getElementById("users_select_all").checked = false;
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
                title: 'Are you sure You Want To Delete All The Selected Users?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.delete(route('users.deletebyselection'), {
                        preserveScroll: true,
                        data: {
                            user_ids: selectedIds
                        }
                    });

                    unSelectAfterAction();
                }
            })

        }


        if (type === "Disable") {

            Swal.fire({
                title: 'Are you sure You Want To Disable All The Selected Users?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Disable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.put(route('users.disable'), {
                        preserveScroll: true,
                        data: {
                            user_ids: selectedIds
                        }
                    });

                    unSelectAfterAction();
                }
            })

        }


        if (type === "Enable") {

            Swal.fire({
                title: 'Are you sure You Want To Enable All The Selected Users?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Enable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.put(route('users.enable'), {
                        preserveScroll: true,
                        data: {
                            user_ids: selectedIds
                        }
                    });

                    unSelectAfterAction();
                }
            })

        }
    }



    return (
        <>

            <div className="d-flex justify-content-end flex-wrap">
                <Link href={route('users.create')} className='btn bg-gradient-dark '>  <i className="bi bi-plus-square mx-1"></i> Create User</Link>
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
                                <table className="table align-items-center mb-0 ">
                                    <thead className='text-center'>
                                        <tr>
                                            <th>

                                                <div className="checkbox-container text-center">
                                                    <label className={`ios-checkbox dark ${users.data.length == 0 ? 'no-pointer' : ''}`}  >
                                                        <input type="checkbox" id='users_select_all' onClick={selectAllJobs} />
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

                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Role</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created At</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>


                                        {users.data.map((user) => {
                                            return (

                                                <tr key={user.id}>

                                                    <td>

                                                        {

                                                            auth.user.id == user.id ?
                                                                <div className="badge bg-danger">Action Disabled</div>
                                                                :
                                                                <>
                                                                    <div className="checkbox-container text-center">
                                                                        <label className="ios-checkbox red">
                                                                            <input type="checkbox"
                                                                                className='user-select'
                                                                                onChange={(e) => selectSingleJob(user.id, e.target.checked)}
                                                                                name='cronJob_id'
                                                                                value={user.id} />
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
                                                                </>
                                                        }


                                                    </td>

                                                    <td className='align-middle'>
                                                        {user.name.substring(0, 15) + "...."}
                                                    </td>

                                                    <td className='align-middle'>
                                                        <a href={`mailto:${user.email}}`}>{user.email.substring(0, 18) + "...."}</a>
                                                    </td>

                                                    <td className='align-middle'>
                                                        <span className="badge bg-primary">
                                                            {user.role_name || "No Role Assigned"}
                                                        </span>
                                                    </td>

                                                    <td className='align-middle'>
                                                        <span className={`badge bg-gradient-${user.is_enabled == 1 ? "success opacity-7 text-dark" : "danger"}`}>{user.is_enabled == 1 ? "Enabled" : "Disabled"}</span>
                                                    </td>

                                                    <td className='align-middle'>
                                                        {user.added_at}
                                                    </td>

                                                    <td className="align-middle">


                                                        <Link href={route('users.edit', user.id)}>
                                                            <i className='bi bi-pencil-fill cursor-pointer text-dark fs-5 mx-1'></i>
                                                        </Link>

                                                        <Link href={route('users.change-password', user.id)}>
                                                            <i className='bi bi-key-fill cursor-pointer text-dark fs-5 mx-1'></i>
                                                        </Link>



                                                        {

                                                            user.id == auth.user.id ? "" :
                                                                <>
                                                                    <i className='bi bi-trash-fill cursor-pointer text-dark   rounded fs-5 mx-2' onClick={(() => handleDelete(user.id))}></i>
                                                                </>

                                                        }


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
                                        {users.links.map((link) => {
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
