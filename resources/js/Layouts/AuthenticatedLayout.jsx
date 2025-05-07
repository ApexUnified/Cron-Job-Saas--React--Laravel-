
import { Link, usePage } from '@inertiajs/react';
import Sidebar from "@/Components/Main/Sidebar";
import Main from "@/Components/Main/Main";
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { flash } = usePage().props


    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    useEffect(() => {

        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <>
            <ToastContainer />

            <Sidebar />
            <Main
                children={children}
                header={header}
            />

        </>
    );
}
