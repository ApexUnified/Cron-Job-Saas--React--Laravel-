
import AuthImage from '@/Components/Auth/authImage';
import SpinnerButton from '@/Components/Main/MainComponents/SpinnerButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });


    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };


    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <section>
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-8">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-dark text-gradient">Dont Worry We'have Covered You Up</h3>
                                        <p className="mb-0 ">Enter Your Email To Receive Password Reset Link</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={submit} >
                                            <label htmlFor='email'>Email</label>
                                            <div className="mb-3">
                                                <input type="email"
                                                    className="form-control"
                                                    placeholder="Email Address"
                                                    name='email'
                                                    id='email'
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    autoComplete='current-email'
                                                />

                                                <span className="text-danger fw-bold">{errors.email}</span>
                                            </div>


                                            <SpinnerButton
                                                CssClass={"btn-dark w-100 mb-0 mt-2 text-center"}
                                                ButtonText={"Get Link"}
                                                processing={processing}
                                                Type={"submit"}
                                            />
                                        </form>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                    <AuthImage />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </GuestLayout>
    );
}
