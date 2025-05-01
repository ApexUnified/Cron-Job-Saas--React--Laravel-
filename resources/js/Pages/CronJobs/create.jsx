import PartialCreate from '@/Components/Main/Partials/CronJobs/PartialCreate'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function create() {
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


                <PartialCreate heading={"Create Cron Job"} />

            </AuthenticatedLayout>
        </>
    )
}
