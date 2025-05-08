import PartialChangePassword from '@/Components/Main/Partials/Users/PartialChangePassword'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function changePassword() {
    return (
        <>


            <AuthenticatedLayout

                header={
                    <h4 className="font-weight-bolder mb-0">
                        Change Password
                    </h4>
                }

            >


                <Head title='Change Password' />

                <PartialChangePassword />
            </AuthenticatedLayout>

        </>
    )
}
