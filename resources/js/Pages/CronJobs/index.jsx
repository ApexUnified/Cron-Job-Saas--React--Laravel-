import PartialIndex from '@/Components/Main/Partials/CronJobs/PartialIndex'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function index() {
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


                <PartialIndex heading={"All Cron Jobs"} />

            </AuthenticatedLayout>
        </>
    )
}
