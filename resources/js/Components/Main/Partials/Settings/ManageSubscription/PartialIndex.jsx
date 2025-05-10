
import SpinnerButton from '@/Components/Main/MainComponents/SpinnerButton';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react'

export default function PartialIndex() {
    const { auth } = usePage().props;
    const [selectedPlan, setSelectedPlan] = useState(auth.user.subscription.subscription_plan_id ?? 0);
    const { subscriptionPlans } = usePage().props;



    const handlePlanSelect = (index) => {
        setSelectedPlan(index);
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4 fw-bold">Choose Your Subscription Plan</h2>

            {subscriptionPlans.length < 1 &&
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-secondary">
                            <p className="mb-0 text-light text-center fw-bold">
                                <strong>
                                    <i className="bi bi-info-circle mt-2 mx-2 fs-5"></i>
                                    No Subscription Plan Currently Available
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            }

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {subscriptionPlans.map((plan, index) => (
                    <div className="col" key={plan.id}>
                        <div
                            className={`card h-100 shadow-sm ${selectedPlan === plan.id ? 'border-dark border-3' : ''}`}
                            onClick={() => handlePlanSelect(plan.id)}
                            style={{ cursor: 'pointer' }}
                        >

                            {plan.id === auth.user.subscription.subscription_plan_id && (
                                <div className="position-absolute top-0 end-0 mt-2 me-2">
                                    <span className="badge bg-secondary">Active</span>
                                </div>
                            )}

                            <div className="card-header bg-light py-3">
                                <h5 className="card-title text-center mb-0 fw-bold">{plan.name}</h5>
                            </div>

                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <span className="display-5 fw-bold">${plan.price}</span>
                                    <span className="text-muted">/month</span>
                                </div>

                                <div className="card-text">
                                    <div className="table-responsive">
                                        <table className="table table-borderless mb-0">
                                            <tbody>
                                                {plan.description.questions.map((question, qIndex) => (
                                                    <tr key={qIndex}>
                                                        <td className="fw-medium text-muted">{question}</td>
                                                        <td className="text-end fw-bold">
                                                            {plan.description.answers[qIndex] === "Yes" ? (
                                                                <span className="text-success">{plan.description.answers[qIndex]}</span>
                                                            ) : plan.description.answers[qIndex] === "No" ? (
                                                                <span className="text-danger">{plan.description.answers[qIndex]}</span>
                                                            ) : (
                                                                plan.description.answers[qIndex]
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer bg-transparent text-center p-3">
                                <button
                                    className={`btn ${selectedPlan === plan.id && selectedPlan === auth.user.subscription.subscription_plan_id ? 'btn-dark disabled ' :
                                        selectedPlan === plan.id ? 'btn-dark' : 'btn-outline-dark'
                                        } w-100`}
                                    type='button'
                                >
                                    {selectedPlan === plan.id && selectedPlan === auth.user.subscription.subscription_plan_id ? 'Active Plan' : (
                                        selectedPlan === plan.id ? 'Selected Plan' : 'Select Plan')}
                                </button>
                            </div>



                        </div>

                    </div>
                ))}


            </div>

            {selectedPlan != auth.user.subscription.subscription_plan_id &&
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center align-items-center my-4">
                        <SpinnerButton
                            // processing={processing}
                            ButtonText={auth.user.subscription.subscription_plan_id !== 1 ? "Change Plan" : "Upgrade Plan"}
                            CssClass={"btn btn-dark text-center w-25 "}
                            ButtonIcon={<i className="bi bi-cart-plus-fill me-2"></i>}
                            Type={"button"}
                        />
                    </div>
                </div>

            }
        </div>
    );
}
