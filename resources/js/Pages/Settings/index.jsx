import PartialIndex from '@/Components/Main/Partials/Settings/PartialIndex'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function index() {
    return (
        <>


            <AuthenticatedLayout

                header={
                    <h4 className="font-weight-bolder mb-0">
                        Settings
                    </h4>
                }
            >

                <Head title="Settings" />



                <PartialIndex />


            </AuthenticatedLayout>


        </>
    )
}
