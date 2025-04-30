
import { Link, usePage } from '@inertiajs/react';
import Sidebar from "@/Components/Main/Sidebar";
import Main from "@/Components/Main/Main";
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <Sidebar />
            <Main
                children={children}
                header={header}
            />

        </>
    );
}
