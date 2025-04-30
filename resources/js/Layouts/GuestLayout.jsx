
import { Link, usePage } from '@inertiajs/react';
import AuthFooter from "@/Components/Auth/footer";
import AuthNavbar from "@/Components/Auth/navbar";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

export default function GuestLayout({ children }) {

    const { flash } = usePage().props;


    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash])



    return (
        <>
            <ToastContainer />
            <div className="container position-sticky z-index-sticky top-0">
                <AuthNavbar />
            </div>


            <main className="main-content  mt-0">
                {children}
            </main>

            <footer className="footer py-5">
                <AuthFooter />
            </footer>

        </>
    );
}
