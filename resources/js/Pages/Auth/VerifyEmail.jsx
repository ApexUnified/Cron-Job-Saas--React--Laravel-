import AuthImage from '@/Components/Auth/authImage';
import SpinnerButton from '@/Components/Main/MainComponents/SpinnerButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});


    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />
            <section>
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-8">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-dark text-gradient">Verify Email</h3>
                                        <p className="mb-0 ">
                                            Thanks for signing up! Before getting started, could you verify
                                            your email address by clicking on the link we just emailed to
                                            you? If you didn't receive the email, we will gladly send you
                                            another.
                                        </p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={submit} >
                                            <div className="mb-3">
                                                <SpinnerButton
                                                    CssClass={"btn-dark w-100 mb-0 mt-2 text-center"}
                                                    ButtonText={"Verify Email"}
                                                    processing={processing}
                                                    Type={"submit"}
                                                />
                                            </div>
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

        </GuestLayout >
    );
}
