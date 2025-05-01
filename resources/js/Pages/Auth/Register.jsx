import AuthImage from '@/Components/Auth/authImage';
import SpinnerButton from '@/Components/Main/MainComponents/SpinnerButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <section>
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-8">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-dark text-gradient">Welcome To Our Website</h3>
                                        <p className="mb-0">Register Your Account And Use Our Service</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={submit}>
                                            <div className="mb-3">
                                                <label htmlFor="name">Name</label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    name='name'
                                                    id='name'
                                                    value={data.name}
                                                    onChange={(e) => setData("name", e.target.value)}
                                                />
                                                <span className="text-danger fw-bold">{errors.name}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email">Email</label>
                                                <input type="email"
                                                    className="form-control"
                                                    placeholder="Email Address"
                                                    name='email'
                                                    id='email'
                                                    onChange={(e) => setData("email", e.target.value)}
                                                    value={data.email}
                                                    autoComplete='new-email'
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
                                                ButtonText={"Register"}
                                                processing={processing}
                                                Type={"submit"}
                                            />

                                        </form>
                                    </div>
                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                        <p className="mb-4 text-sm mx-auto">
                                            Already have an account?
                                            <Link href={route("login")} className="text-dark text-gradient font-weight-bold"> Login</Link>
                                        </p>
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
