import PartialCreate from '@/Components/Main/Partials/Users/PartialCreate'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function create() {
    return (
        <>


            <AuthenticatedLayout

                header={
                    <h4 className="font-weight-bolder mb-0">
                        Create User
                    </h4>
                }

            >


                <Head title='Users' />

                <PartialCreate />
            </AuthenticatedLayout>
        </>
    )
}
