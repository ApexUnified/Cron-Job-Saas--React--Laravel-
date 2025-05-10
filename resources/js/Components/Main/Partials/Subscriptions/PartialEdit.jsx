import React from 'react'
import SpinnerButton from '../../MainComponents/SpinnerButton';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function PartialEdit() {
    const { users } = usePage().props;
    const { subscriptionPlans } = usePage().props;
    const { subscription } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        user_id: subscription.user.id || "",
        subscription_plan_id: subscription.subscription_plan.id || "",
        start_date: subscription.start_date || "",
        end_date: subscription.end_date || "",
        status: subscription.status || "",
        auto_renew: subscription.auto_renew ?? "",
        is_active: subscription.is_active ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('subscriptions.update', subscription.id), data);
    }

    return (
        <>
            <div className="d-flex justify-content-end flex-wrap">
                <Link href={route('subscriptions.index')} className="btn btn-dark ">
                    <i className="bi bi-arrow-bar-left mx-1"></i>
                    Back To Subscriptions
                </Link>
            </div>


            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow-lg">
                        <div className="card-body">


                            <form onSubmit={submit}>


                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="my-3">
                                            <label htmlFor="user_id">User <span className='text-danger'>  * </span></label>
                                            <select name="user_id"
                                                id="user_id"
                                                className="form-control choices"
                                                value={data.user_id}
                                                onChange={(e) => setData('user_id', e.target.value)}

                                            >
                                                <option value="" hidden>Select User</option>

                                                {users.map((user) => (
                                                    <option key={user.id} value={user.id}>{user.name}</option>
                                                ))}

                                            </select>
                                            <span className="text-danger fw-bold">{errors.user_id}</span>


                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="my-3">
                                            <label htmlFor="subscription_plan_id">Subscription Plan <span className='text-danger'>  * </span></label>
                                            <select name="subscription_plan_id"
                                                id="subscription_plan_id"
                                                className="form-control choices"
                                                value={data.subscription_plan_id}
                                                onChange={(e) => setData('subscription_plan_id', e.target.value)}

                                            >
                                                <option value="" hidden>Select Subscription Plan</option>

                                                {subscriptionPlans.map((plan) => (
                                                    <option key={plan.id} value={plan.id}>{plan.name}</option>
                                                ))}

                                            </select>
                                            <span className="text-danger fw-bold">{errors.subscription_plan_id}</span>


                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="my-3">
                                            <label htmlFor="status">Subscription Status <span className='text-danger'>  * </span></label>
                                            <select name="status"
                                                id="status"
                                                className="form-control choices"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}

                                            >
                                                <option value="" hidden>Select Subscription Status</option>

                                                <option value="Active">Active</option>
                                                <option value="Expired">Expired</option>

                                            </select>
                                            <span className="text-danger fw-bold">{errors.status}</span>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="my-3">
                                            <label htmlFor="status">Subscription Auto Renew <span className='text-danger'>  * </span></label>
                                            <select name="auto_renew"
                                                id="auto_renew"
                                                className="form-control choices"
                                                value={data.auto_renew}
                                                onChange={(e) => setData('auto_renew', e.target.value)}

                                            >
                                                <option value="" hidden>Select Subscription Auto Renew Status</option>

                                                <option value={1}>Enabled</option>
                                                <option value={0}>Disabled</option>

                                            </select>
                                            <span className="text-danger fw-bold">{errors.auto_renew}</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="my-3">
                                            <label htmlFor="start_date">Subscription Start Date <span className='text-danger'>  * </span></label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Subscription Start Date'
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                            />

                                            <span className="text-danger fw-bold">{errors.start_date}</span>
                                        </div>
                                    </div>



                                    <div className="col-md-6">
                                        <div className="my-3">
                                            <label htmlFor="end_date">Subscription End Date <span className='text-danger'>  * </span></label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Subscription End Date'
                                                value={data.end_date}
                                                onChange={(e) => setData('end_date', e.target.value)}
                                            />

                                            <span className="text-danger fw-bold">{errors.end_date}</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="my-3">
                                            <label htmlFor="status">Subscription Active Status <span className='text-danger'>  * </span></label>
                                            <select name="is_active"
                                                id="is_active"
                                                className="form-control choices"
                                                value={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.value)}

                                            >
                                                <option value="" hidden>Select Subscription Active Status</option>

                                                <option value={1}>Enabled</option>
                                                <option value={0}>Disabled</option>

                                            </select>
                                            <span className="text-danger fw-bold">{errors.is_active}</span>
                                        </div>
                                    </div>
                                </div>


                                <SpinnerButton
                                    ButtonText={"Update Subscription"}
                                    CssClass={"btn btn-dark"}
                                    ButtonIcon={<i className="bi bi-pencil mx-1"></i>}
                                    processing={processing}
                                    Type={"submit"}
                                />

                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
