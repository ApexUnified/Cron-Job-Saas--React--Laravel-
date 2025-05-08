import { Link, router, usePage } from '@inertiajs/react'
import { info } from 'autoprefixer';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

export default function PartialIndex() {


    const [selectedIds, setSelectedIds] = useState([]);
    const { roles } = usePage().props;





    const selectAllJobs = () => {
        const allSelectedjobs = document.querySelectorAll(".role-select");
        const ids = [];
        allSelectedjobs.forEach((el) => {
            el.checked = document.getElementById("role_select_all").checked;
            if (el.checked) {
                ids.push(el.value);
            }

            setSelectedIds(ids);
        });
    }

    const unSelectAfterAction = () => {
        const allSelectedjobs = document.querySelectorAll(".role-select");
        const parentcheckBox = document.getElementById("role_select_all").checked = false;
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
                title: 'Are you sure You Want To Delete All The Selected Roles?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#222',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.delete(route("settings.role.deletebyselection"), {
                        preserveScroll: true,
                        data: {
                            role_ids: selectedIds
                        }
                    });

                    unSelectAfterAction();
                }
            });
        }


    }

    const handleDelete = (id) => {



        Swal.fire({
            title: 'Are you sure You Want To Delete This Roles?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#222',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("settings.role.destroy", id));
            }
        });


    }


    return (
        <>
            <div className="d-flex justify-content-sm-center justify-content-lg-end flex-wrap ">
                <div>


                    <Link href={route("settings.permission.create")} className="btn btn-dark mx-2 ">
                        <i className="bi bi-plus-square mx-1"></i>
                        Create Permission
                    </Link>

                    <Link href={route("settings.role.create")} className="btn btn-dark ">
                        <i className="bi bi-plus-square mx-1"></i>
                        Create Role
                    </Link>


                </div>
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
                                                    <label className={`ios-checkbox dark  ${roles.data.length == 0 ? 'no-pointer' : ''} `}>
                                                        <input type="checkbox" id='role_select_all' onClick={selectAllJobs} />
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
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Role Name</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Added At</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            roles.data.map((role) => {

                                                return (
                                                    <tr key={role.id}>

                                                        <td>

                                                            {role.name === "Admin" ? <div className="badge bg-danger">Action Disabled</div> :

                                                                <>
                                                                    <div className="checkbox-container text-center">
                                                                        <label className="ios-checkbox red">
                                                                            <input type="checkbox"
                                                                                className='role-select'
                                                                                onChange={(e) => selectSingleJob(role.id, e.target.checked)}
                                                                                name='cronJob_id'
                                                                                value={role.id} />
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

                                                        <td className="align-middle">{role.name}</td>
                                                        <td className="align-middle">{role.added_at}</td>

                                                        <td className="align-middle">

                                                            {role.name === "Admin" ?

                                                                <Link href={route('settings.permission.index', role.id)}>
                                                                    <i className='bi bi-shield-lock-fill cursor-pointer text-dark fs-5 mx-1'></i>
                                                                </Link>

                                                                :

                                                                <>
                                                                    <Link href={route('settings.role.edit', role.id)}>
                                                                        <i className='bi bi-pencil-fill cursor-pointer text-dark fs-5 mx-1'></i>
                                                                    </Link>

                                                                    <Link href={route('settings.permission.index', role.id)}>
                                                                        <i className='bi bi-shield-lock-fill cursor-pointer text-dark fs-5 mx-1'></i>
                                                                    </Link>

                                                                    <i className='bi bi-trash-fill cursor-pointer text-dark   rounded fs-5 mx-2' onClick={(() => handleDelete(role.id))}></i>


                                                                </>

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
                                        {roles.links.map((link) => {
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

                </div >
            </div >

        </>
    )
}
