import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <section>
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-8">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-dark text-gradient">Welcome back</h3>
                                        <p className="mb-0">Enter your email and password to sign in</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={submit} >
                                            <div className="mb-3">
                                                <label htmlFor='email'>Email</label>
                                                <input type="email"
                                                    className="form-control"
                                                    placeholder="Email Address"
                                                    name='email'
                                                    id='email'
                                                    onChange={(e) => setData('email', e.target.value)}
                                                />

                                                <span className="text-danger fw-bold">{errors.email}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor='password'>Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    name="password"
                                                    id='password'
                                                    onChange={(e) => setData('password', e.target.value)}
                                                />

                                                <span className="text-danger fw-bold">{errors.password}</span>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input"
                                                    type="checkbox"
                                                    id="rememberMe"
                                                    name="remember"
                                                    onChange={(e) => setData('remember', e.target.checked)}
                                                />
                                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn bg-gradient-dark w-100 mt-4 mb-0" disabled={processing}>Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                        <p className="mb-4 text-sm mx-auto">
                                            Forgot Password?
                                            <Link href={route("password.request")} className="text-dark text-gradient font-weight-bold"> Reset Password</Link>
                                        </p>

                                        <p className="mb-4 text-sm mx-auto">
                                            Don't have an account?
                                            <Link href={route("register")} className="text-dark text-gradient font-weight-bold"> Register</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                    <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: "url('../assets/img/curved-images/curved6.jpg')" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout >
    );
}
