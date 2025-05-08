import SpinnerButton from '@/Components/Main/MainComponents/SpinnerButton';
import { Link, useForm, usePage } from '@inertiajs/react';
import React from 'react'

export default function PartialEdit() {

    const { role } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        name: role?.name || "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("settings.role.update", role.id), data);
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
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Role Name</label>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='Enter Role Name'
                                        id='name'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        name='name'
                                    />

                                    <span className="text-danger fw-bold">{errors.name}</span>
                                </div>

                                <SpinnerButton
                                    processing={processing}
                                    CssClass={"btn btn-dark my-3"}
                                    ButtonText={"Update Role"}
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
