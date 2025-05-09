import SpinnerButton from '@/Components/Main/MainComponents/SpinnerButton'
import React from 'react'

export default function PartialIndex() {
    return (
        <>

            <div className="row">
                <div className="col-md-12">



                    <div className="card shadow-lg">
                        <div className="card-header">Sustaining Membership</div>

                        <div className="card-body">
                            <p>
                                By becoming a Premium Member, you're helping us fund ongoing operation and improvement of our service.
                                <br />
                                As a thank-you, we can provide exclusive benefits to users holding Premium Member status.
                            </p>



                            <div className="table-responsive">
                                <table className="table table-bordered text-center">
                                    <thead className="table-light">
                                        <tr>
                                            <th></th>
                                            <th>Default Membership (Current)</th>
                                            <th>Premium Membership</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Premium Customer Support</td>
                                            <td className="text-danger">✗</td>
                                            <td className="text-success">✔</td>
                                        </tr>


                                        <tr>
                                            <td>Max failures before disabling a job</td>
                                            <td>25</td>
                                            <td>200</td>
                                        </tr>


                                        <tr>
                                            <td>Max Cron jobs </td>
                                            <td>3</td>
                                            <td>Unlimited</td>
                                        </tr>

                                        <tr>
                                            <td>Max API calls per day</td>
                                            <td>100</td>
                                            <td>5000</td>
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            <td>Free</td>
                                            <td>10 USD / month<br />or 100 USD / year</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="text-center mt-4">
                                <p className="fw-bold">Ready?</p>


                                <SpinnerButton
                                    CssClass={"btn bg-gradient-dark "}
                                    ButtonText="SUBSCRIBE NOW"
                                    ButtonIcon={<i className="bi bi-cart-fill me-2"></i>}
                                    Type={"button"}
                                />
                            </div>


                            <small className="text-muted">
                                All prices include statutory VAT, if applicable (depending on your location).
                                More details will be shown during the checkout process before placing the order.
                            </small>


                        </div>

                    </div>


                </div>
            </div>

        </>
    )
}
