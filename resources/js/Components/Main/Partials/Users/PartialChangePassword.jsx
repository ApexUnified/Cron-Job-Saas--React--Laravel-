import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'
import SpinnerButton from '../../MainComponents/SpinnerButton'

export default function PartialChangePassword() {
    const { user } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        current_password: "",
        password: "",
        password_confirmation: "",

    });

    const submit = (e) => {
        e.preventDefault();
        post(route("users.update-password", user.id), data);
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
                                            <label htmlFor="current_password" className="form-label">Current Password</label>
                                            <input type="password"
                                                className='form-control'
                                                placeholder='Enter Current Password'
                                                id='current_password'
                                                autoComplete='current-password'
                                                value={data.current_password}
                                                onChange={(e) => setData('current_password', e.target.value)}
                                                name='current_password'
                                            />

                                            <span className="text-danger fw-bold">{errors.current_password}</span>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">New Password</label>
                                            <input type="password"
                                                className='form-control'
                                                placeholder='Enter New Password'
                                                autoComplete='new-password'
                                                id='password'
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                name='password'
                                            />

                                            <span className="text-danger fw-bold">{errors.password}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                                            <input type="password"
                                                className='form-control'
                                                placeholder='Enter Confirm Password'
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



                                <SpinnerButton
                                    processing={processing}
                                    CssClass={"btn btn-dark my-3"}
                                    ButtonText={"Update Password"}
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
