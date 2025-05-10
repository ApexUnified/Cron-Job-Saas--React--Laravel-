import PartialIndex from '@/Components/Main/Partials/Subscriptions/PartialIndex'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function index() {
    return (
        <>

            <AuthenticatedLayout
                header={
                    <h4 className="font-weight-bolder mb-0">
                        Subscriptions
                    </h4>
                }
            >

                <Head title='Subscriptions' />


                <PartialIndex />


            </AuthenticatedLayout>

        </>
    )
}
