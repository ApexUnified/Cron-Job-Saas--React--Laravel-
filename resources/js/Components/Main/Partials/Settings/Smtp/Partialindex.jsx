import SpinnerButton from '@/Components/Main/MainComponents/SpinnerButton';
import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'

export default function Partialindex() {

    const { smtp } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        mailer: smtp?.mailer || "",
        scheme: smtp?.scheme || "",
        host: smtp?.host || "",
        port: smtp?.port || "",
        username: smtp?.username || "",
        password: smtp?.password || "",
        from_address: smtp?.from_address || "",
        from_name: smtp?.from_name || ""
    });



    const submit = (e) => {
        e.preventDefault();
        post(route("settings.smtp.save"), data);
    }

    return (
        <>

            <div className="card shadow-lg">
                <div className="card-body">


                    <div className="d-flex justify-content-end flex-wrap">
                        <Link href={route("settings.index")} className="btn btn-dark">
                            <i className='bi bi-arrow-bar-left mx-1'></i>
                            Back To Settings
                        </Link>
                    </div>

                    <div className="row">
                        <div className="col-md-12">

                            <form onSubmit={submit}>

                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>SMTP Mailer</label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Enter SMTP Mailer'
                                                onChange={(e) => setData('mailer', e.target.value)}
                                                name='mailer'
                                                value={data.mailer}
                                            />

                                            <span className="text-danger fw-bold">{errors.mailer}</span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>SMTP Scheme</label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Enter SMTP Scheme'
                                                onChange={(e) => setData('scheme', e.target.value)}
                                                name='scheme'
                                                value={data.scheme}
                                            />

                                            <span className="text-danger fw-bold">{errors.scheme}</span>
                                        </div>
                                    </div>
                                </div>



                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>SMTP Host</label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Enter SMTP Host'
                                                onChange={(e) => setData('host', e.target.value)}
                                                name='host'
                                                value={data.host}
                                            />

                                            <span className="text-danger fw-bold">{errors.host}</span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>SMTP Port</label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Enter SMTP Port'
                                                onChange={(e) => setData('port', e.target.value)}
                                                name='port'
                                                value={data.port}
                                            />

                                            <span className="text-danger fw-bold">{errors.port}</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>SMTP Username</label>
                                            <input type="email"
                                                className='form-control'
                                                placeholder='Enter SMTP Username'
                                                onChange={(e) => setData('username', e.target.value)}
                                                name='username'
                                                autoComplete='new-email'
                                                value={data.username}
                                            />

                                            <span className="text-danger fw-bold">{errors.username}</span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>SMTP Password</label>
                                            <input type="password"
                                                className='form-control'
                                                placeholder='Enter SMTP Password'
                                                onChange={(e) => setData('password', e.target.value)}
                                                name='password'
                                                autoComplete='new-password'
                                                value={data.password}
                                            />

                                            <span className="text-danger fw-bold">{errors.password}</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>SMTP From Address</label>
                                            <input type="email"
                                                className='form-control'
                                                placeholder='Enter SMTP From Address'
                                                onChange={(e) => setData('from_address', e.target.value)}
                                                name='from_address'
                                                value={data.from_address}
                                            />

                                            <span className="text-danger fw-bold">{errors.from_address}</span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="" className='form-label'>SMTP From Name</label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Enter SMTP From Name'
                                                onChange={(e) => setData('from_name', e.target.value)}
                                                name='from_name'
                                                value={data.from_name}
                                            />

                                            <span className="text-danger fw-bold">{errors.from_name}</span>
                                        </div>
                                    </div>
                                </div>


                                <SpinnerButton
                                    ButtonText={"Save Changes"}
                                    processing={processing}
                                    CssClass={"btn btn-dark"}
                                    ButtonIcon={<i className='bi bi-save mx-2'></i>}
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
