import Partialindex from '@/Components/Main/Partials/Settings/Smtp/Partialindex'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function index() {
    return (
        <>


            <AuthenticatedLayout

                header={
                    <h4 className="font-weight-bolder mb-0">
                        SMTP Settings
                    </h4>
                }
            >

                <Head title='SMTP Settings' />



                <Partialindex />


            </AuthenticatedLayout>

        </>
    )
}
