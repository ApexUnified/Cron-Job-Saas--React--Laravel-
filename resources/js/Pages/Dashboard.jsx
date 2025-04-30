import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Dashboard_Component from '@/Components/Main/Partials/Dashboard_Component';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-weight-bolder mb-0">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <Dashboard_Component />
        </AuthenticatedLayout>
    );
}
