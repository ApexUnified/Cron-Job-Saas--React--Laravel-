import PartialEdit from '@/Components/Main/Partials/CronJobs/PartialEdit'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function edit() {
    return (

        <>
            <AuthenticatedLayout


                header={
                    <h4 className="font-weight-bolder mb-0">
                        Cron Job
                    </h4>
                }

            >

                <Head title='Cron Jobs' />


                <PartialEdit />

            </AuthenticatedLayout>
        </>
    )
}
