import PartialIndex from '@/Components/Main/Partials/Settings/RolePermission/Role/PartialIndex'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function index() {
    return (

        <>

            <AuthenticatedLayout


                header={
                    <h4 className="font-weight-bolder mb-0">
                        Roles
                    </h4>
                }
            >


                <Head title='Roles' />



                <PartialIndex />

            </AuthenticatedLayout>

        </>
    )
}
