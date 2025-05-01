import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PartialDashboard from '@/Components/Main/Partials/PartialDashboard';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h4 className="font-weight-bolder mb-0">
                    Dashboard
                </h4>
            }
        >
            <Head title="Dashboard" />

            <PartialDashboard />
        </AuthenticatedLayout>
    );
}
