import { Link } from '@inertiajs/react'
import React from 'react'

export default function QuotaCompleteAlert() {
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="alert alert-dark text-white" role="alert">
                        <h4 className="alert-heading">Today's Cron Job Request Quota Reached</h4>
                        <p>
                            You have reached your daily quota for cron job requests. Your cron jobs will not run again until the quota resets tomorrow.
                        </p>
                        <p>
                            To increase your daily request limit, please
                            <Link
                                href={route('settings.subscription.manage')}
                                className="text-white fw-bold mx-2 text-decoration-underline"
                            >
                                explore our subscription plans
                            </Link>.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
