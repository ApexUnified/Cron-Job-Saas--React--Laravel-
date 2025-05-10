import { Link, useForm, usePage } from '@inertiajs/react';
import React from 'react'
import SpinnerButton from '../../MainComponents/SpinnerButton';

export default function PartialEdit() {

    const { roles, user } = usePage().props;
    console.log(user);
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        name: user.name || "",
        email: user.email || "",
        role: user.role_name || "",
        is_enabled: user.is_enabled ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("users.update", user.id), data);
    }
    return (
        <>

            <div className="d-flex justify-content-end flex-wrap">
                <Link href={route("users.index")} className="btn btn-dark">
                    <i className='bi bi-arrow-bar-left mx-1'></i>
                    Back To Users
                </Link>
            </div>


            <div className="row">
                <div className="col-md-12">


                    <div className="card shadow-lg">
                        <div className="card-body">
                            <form onSubmit={submit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">User Name</label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Enter User Name'
                                                id='name'
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                name='name'
                                            />

                                            <span className="text-danger fw-bold">{errors.name}</span>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">User Email</label>
                                            <input type="email"
                                                className='form-control'
                                                placeholder='Enter User Email'
                                                autoComplete='new-email'
                                                id='email'
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                name='email'
                                            />

                                            <span className="text-danger fw-bold">{errors.email}</span>
                                        </div>
                                    </div>
                                </div>



                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label">User Roles</label>
                                            <select name="role"
                                                id="role"
                                                className='form-control choices'
                                                value={data.role}
                                                onChange={(e) => setData('role', e.target.value)}

                                            >
                                                <option value="" hidden>Select Role</option>

                                                {roles.map((role) => {
                                                    return <option key={role.name} value={role.name}>{role.name}</option>
                                                })}


                                            </select>

                                            <span className="text-danger fw-bold">{errors.role}</span>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="is_enabled" className="form-label">User Status</label>
                                            <select name="is_enabled"
                                                id="is_enabled"
                                                className='form-control choices'
                                                value={data.is_enabled}
                                                onChange={(e) => setData('is_enabled', e.target.value)}

                                            >
                                                <option value="" hidden>Select Status</option>

                                                <option value={1} selected={data.is_enabled == 1}>Enabled</option>
                                                <option value={0} selected={data.is_enabled == 0}>Disabled</option>



                                            </select>

                                            <span className="text-danger fw-bold">{errors.is_enabled}</span>
                                        </div>
                                    </div>



                                </div>

                                <SpinnerButton
                                    processing={processing}
                                    CssClass={"btn btn-dark my-3"}
                                    ButtonText={"Update User"}
                                    ButtonIcon={<i className='bi bi-pencil mx-2'></i>}
                                    Type={"submit"}
                                />
                            </form>
                        </div>
                    </div>




                </div>
            </div>






        </>
    )
}
