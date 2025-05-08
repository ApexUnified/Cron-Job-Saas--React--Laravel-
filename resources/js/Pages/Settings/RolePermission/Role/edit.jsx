import PartialEdit from '@/Components/Main/Partials/Settings/RolePermission/Role/PartialEdit'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function edit() {
    return (
        <>

            <AuthenticatedLayout


                header={
                    <h4 className="font-weight-bolder mb-0">
                        Role Edit
                    </h4>
                }

            >



                <Head title='Role Edit' />


                <PartialEdit />

            </AuthenticatedLayout>

        </>
    )
}
