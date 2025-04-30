
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

                                                />
                                                <span className="text-danger fw-bold">{errors.password_confirmation}</span>
                                            </div>

                                            <div className="text-center">
                                                <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2" disabled={processing}>Reset Password</button>
                                            </div>

                                        </form>
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

        </GuestLayout>
    );
}
