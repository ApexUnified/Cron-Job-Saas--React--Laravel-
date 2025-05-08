import React from 'react'
import SpinnerButton from '../../MainComponents/SpinnerButton'
import { Link, useForm, usePage } from '@inertiajs/react';

export default function PartialCreate() {
    const { roles } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"), data);
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
                                            <label htmlFor="password" className="form-label">User Password</label>
                                            <input type="password"
                                                className='form-control'
                                                placeholder='Enter User Password'
                                                id='password'
                                                autoComplete='new-password'
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                name='password'
                                            />

                                            <span className="text-danger fw-bold">{errors.password}</span>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="password_confirmation" className="form-label">User Confirm Password</label>
                                            <input type="password"
                                                className='form-control'
                                                placeholder='Enter User Confirm Password'
                                                id='password_confirmation'
                                                autoComplete='new-password'
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                name='password_confirmation'
                                            />

                                            <span className="text-danger fw-bold">{errors.password_confirmation}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label">User Roles</label>
                                            <select name="role"
                                                id="role"
                                                className='form-control'
                                                value={data.role}
                                                onChange={(e) => setData('role', e.target.value)}

                                            >
                                                <option value="" hidden>Select Role</option>

                                                {roles.map((role) => {
                                                    return <option key={role.name} value={role.name}>{role.name}</option>
                                                })}


                                            </select>

                                            <span className="text-danger fw-bold">{errors.password}</span>
                                        </div>
                                    </div>



                                </div>

                                <SpinnerButton
                                    processing={processing}
                                    CssClass={"btn btn-dark my-3"}
                                    ButtonText={"Create User"}
                                    ButtonIcon={<i className='bi bi-plus-square mx-2'></i>}
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
