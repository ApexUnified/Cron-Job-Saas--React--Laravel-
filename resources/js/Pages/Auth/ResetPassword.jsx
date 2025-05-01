
import AuthImage from '@/Components/Auth/authImage';
import SpinnerButton from '@/Components/Main/MainComponents/SpinnerButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            <section>
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-8">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-dark text-gradient">Here You Can Reset Your Password</h3>
                                        <p className="mb-0">Please Set a Unique And Rememberable Password For Your Account</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={submit}>

                                            <div className="mb-3">
                                                <label htmlFor="email">Email</label>
                                                <input type="email"
                                                    className="form-control"
                                                    placeholder="Email Address"
                                                    name='email'
                                                    id='email'
                                                    onChange={(e) => setData("email", e.target.value)}
                                                    value={data.email}
                                                    autoComplete='current-email'
                                                />
                                                <span className="text-danger fw-bold">{errors.email}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password">Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    name='password'
                                                    id='password'
                                                    onChange={(e) => setData("password", e.target.value)}
                                                    value={data.password}
                                                    autoComplete='new-password'
                                                />
                                                <span className="text-danger fw-bold">{errors.password}</span>
                                            </div>


                                            <div className="mb-3">
                                                <label htmlFor="password_confirmation">Confirm Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    placeholder="Confirm Password"
                                                    name='password_confirmation'
                                                    id='password_confirmation'
                                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                                    value={data.password_confirmation}
                                                    autoComplete='new-password'

                                                />
                                                <span className="text-danger fw-bold">{errors.password_confirmation}</span>
                                            </div>

                                            <SpinnerButton
                                                CssClass={"btn-dark w-100 mb-0 mt-2 text-center"}
                                                ButtonText={"Reset Password"}
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
