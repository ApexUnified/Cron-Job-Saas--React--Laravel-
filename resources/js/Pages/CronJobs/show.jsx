import PartialShow from '@/Components/Main/Partials/CronJobs/PartialShow'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function show() {
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


                <PartialShow />

            </AuthenticatedLayout>
        </>
    )
}
