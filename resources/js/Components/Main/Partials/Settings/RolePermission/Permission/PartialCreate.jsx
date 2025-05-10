import SpinnerButton from '@/Components/Main/MainComponents/SpinnerButton'
import { Link, useForm } from '@inertiajs/react'
import React from 'react'

export default function Partialcreate() {


    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        icon: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("settings.permission.store"), data);
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


                    <div className="card shadow-lg">
                        <div className="card-body">
                            <form onSubmit={submit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Permission Name</label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Enter Permission Name'
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
                                            <label htmlFor="icon" className="form-label">Permission Icon</label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Enter Permission BS Icon Name Just After bi bi-'
                                                id='icon'
                                                value={data.icon}
                                                onChange={(e) => setData('icon', e.target.value)}
                                                name='icon'
                                            />

                                            <span className="text-danger fw-bold">{errors.icon}</span>
                                        </div>
                                    </div>
                                </div>

                                <SpinnerButton
                                    processing={processing}
                                    CssClass={"btn btn-dark"}
                                    ButtonText={"Create Permission"}
                                    ButtonIcon={<i className="bi bi-save mx-1"></i>}
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
