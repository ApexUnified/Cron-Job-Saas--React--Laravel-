
import { Link, usePage } from '@inertiajs/react';
import Sidebar from "@/Components/Main/Sidebar";
import Main from "@/Components/Main/Main";
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Choices from 'choices.js';
import "choices.js/public/assets/styles/choices.css";
import QuotaCompleteAlert from '@/Components/Main/MainComponents/QuotaCompleteAlert';


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { flash } = usePage().props;
    const { is_quota_completed } = usePage().props;





    useEffect(() => {
        const elements = document.querySelectorAll('.choices');
        elements.forEach((el) => {
            if (el.tagName === 'SELECT' || el.tagName === 'INPUT') {
                new Choices(el, {
                    searchEnabled: true,
                    itemSelectText: '',
                });
            }
        });
    }, []);


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
                children={
                    <>
                        {is_quota_completed && <QuotaCompleteAlert />}
                        {children}
                    </>

                }
                header={header}
            />

        </>
    );
}
