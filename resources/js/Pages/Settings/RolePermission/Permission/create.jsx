import Partialcreate from '@/Components/Main/Partials/Settings/RolePermission/Permission/Partialcreate'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function create() {
    return (
        <>

            <AuthenticatedLayout

                header={
                    <h4 className="font-weight-bolder mb-0">
                        Create Permission
                    </h4>
                }

            >

                <Head title='Create Permission' />


                <Partialcreate />

            </AuthenticatedLayout>

        </>
    )
}
