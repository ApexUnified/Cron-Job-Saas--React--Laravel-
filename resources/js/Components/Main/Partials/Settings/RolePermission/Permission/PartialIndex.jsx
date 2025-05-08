import SpinnerButton from '@/Components/Main/MainComponents/SpinnerButton';
import { Link, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function PartialIndex() {

    const { permissions } = usePage().props;
    const { id } = usePage().props;
    const { hasPermissions } = usePage().props;


    const groupedPermissions = permissions.reduce((acc, permission) => {
        const category = permission.name.split(' ')[0]; // e.g., "Dashboard", "CronJob", "Setting"
        if (!acc[category]) acc[category] = [];
        acc[category].push(permission);
        return acc;
    }, {});

    const [SelectedPermissions, SetSelectedPermissions] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        permission_id: [],
        role_id: id
    });

    const handleSelectAll = (isChecked) => {
        const selectAll = document.getElementById('select_all');
        const singleSelect = document.querySelectorAll(".single_select");

        selectAll.checked = isChecked;

        if (isChecked) {
            SetSelectedPermissions(permissions.map(permission => permission.id));
        } else {
            SetSelectedPermissions([]);
        }

        singleSelect.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    };

    useEffect(() => {
        if (errors.permission_id) {
            toast.error(errors.permission_id);
        }

        if (errors.role_id) {
            toast.error(errors.role_id);
        }
    }, [errors])

    useEffect(() => {
        setData('permission_id', SelectedPermissions);
    }, [SelectedPermissions]);


    useEffect(() => {
        SetSelectedPermissions(hasPermissions);

        const selectAll = document.getElementById('select_all');
        selectAll.checked = hasPermissions.length === permissions.length;




    }, []);

    const submit = () => {
        post(route("settings.permission.assign", id), data);
    }

    return (
        <>

            <div className="d-flex justify-content-end flex-wrap">
                <Link href={route("settings.role.index")} className="btn btn-dark">
                    <i className='bi bi-arrow-bar-left mx-1'></i>
                    Back To Roles
                </Link>
            </div>



            <div className="row">
                <div className="col-md-12">



                    <div className="card shadow-md">
                        <div className="card-body">

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-check" >
                                        <input className="form-check-input"
                                            type="checkbox"
                                            value="select_all"
                                            id="select_all"
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                        />
                                        <label className="form-check-label" >
                                            Select All
                                        </label>
                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                {Object.entries(groupedPermissions).map(([category, permission]) => {
                                    return (
                                        <div className="col-md-6 my-2" key={category}>
                                            <div className="card shadow-lg">
                                                <div className="card-body d-flex justify-content-center flex-column align-items-center" style={{ minHeight: "250px" }}>
                                                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                                                        <i className={`bi bi-${permission[0].icon} text-white fs-3`}></i>
                                                    </div>
                                                    <h4>
                                                        {category}
                                                    </h4>


                                                    <div className="row">
                                                        {permission.map((permission, index) => {
                                                            return (
                                                                <div className="col-md-4 " key={index}>
                                                                    <div className="form-check" >
                                                                        <input className="form-check-input single_select"
                                                                            type="checkbox"
                                                                            value={permission.id}
                                                                            id={permission.name}
                                                                            name='permissions[]'
                                                                            checked={SelectedPermissions.includes(permission.id)}
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    SetSelectedPermissions([...SelectedPermissions, permission.id]);
                                                                                } else {
                                                                                    SetSelectedPermissions(SelectedPermissions.filter((id) => id !== permission.id));
                                                                                }
                                                                            }}

                                                                        />
                                                                        <label className="form-check-label" htmlFor={permission.name}>
                                                                            {permission.name}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>


                            <SpinnerButton
                                ButtonIcon={<i className='bi bi-save mx-2'></i>}
                                ButtonText={"Save Changes"}
                                CssClass={"btn btn-dark my-3"}
                                processing={processing}
                                Action={submit}
                                Type={"button"}
                            />


                        </div>
                    </div>


                </div>
            </div>


        </>
    )
}
