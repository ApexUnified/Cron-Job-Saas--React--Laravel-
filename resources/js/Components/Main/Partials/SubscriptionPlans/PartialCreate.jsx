import { Link, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import SpinnerButton from '../../MainComponents/SpinnerButton';
import { toast } from 'react-toastify';




export default function PartialCreate() {



    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        price: "",
        description: {
            questions: {},
            answers: {}
        },
        max_cron_jobs: "",
        max_job_failed_before_disable: "",
        is_active: true,
        request_limit_per_day: "",
        premium_customer_support: false

    });



    const [description_dds, setDescription_dds] = useState([{ questions: '', answers: '' }]);

    const handleInputChange = (index, field, value) => {
        const updatedDd = [...description_dds];
        updatedDd[index][field] = value;
        setDescription_dds(updatedDd);


        const updatedQuestions = { ...data.description.questions };
        const updatedAnswers = { ...data.description.answers };

        updatedQuestions[index] = updatedDd[index].questions;
        updatedAnswers[index] = updatedDd[index].answers;

        setData('description.questions', updatedQuestions);
        setData('description.answers', updatedAnswers);
    };

    const addDropdown = () => {
        setDescription_dds([...description_dds, { questions: '', answers: '' }]);
    };

    const handleDeleteDD = (id) => {
        const updatedDd = [...description_dds];
        updatedDd.splice(id, 1);
        setDescription_dds(updatedDd);
        setData('description', updatedDd);
    }

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
        // return;
        post(route('subscription-plans.store'), data);
    }

    return (
        <>

            <div className="d-flex justify-content-end flex-wrap">
                <Link href={route('subscription-plans.index')} className="btn btn-dark ">
                    <i className="bi bi-arrow-bar-left mx-1"></i>
                    Back To Subscription Plans
                </Link>
            </div>


            <div className="row">
                <div className="col-md-12">


                    <div className="card shadow-lg">
                        <div className="card-body">



                            <form onSubmit={submit}>


                                <div className="row">
                                    <div className="col-md-6">

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Plan Name</label>
                                            <input type="text"
                                                className='form-control'
                                                placeholder='Plan Name'
                                                id='name'
                                                onChange={(e) => setData('name', e.target.value)}
                                                value={data.name}
                                                name='name '
                                            />

                                            <span className="text-danger fw-bold">{errors.name}</span>
                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">Plan Price</label>
                                            <input type="number"
                                                step={0.01}
                                                min={0}
                                                id='price'
                                                className='form-control'
                                                placeholder='Plan Price'
                                                onChange={(e) => setData('price', e.target.value)}
                                                value={data.price}
                                                name='price'

                                            />
                                            <span className="text-danger fw-bold">{errors.price}</span>
                                        </div>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 ">
                                        <div className="mb-3">
                                            <label htmlFor="" className="form-label">Plan Description</label>

                                            <div className="row">
                                                {description_dds.map((item, index) => (
                                                    <div key={index} className="row">
                                                        {index == 0 ? "" : <div className="d-flex justify-content-end flex-wrap mt-2">
                                                            <button type='button' onClick={() => handleDeleteDD(index)} className="btn btn-danger"><i className="bi bi-trash"></i></button>
                                                        </div>}
                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="form-label">Question</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Question"
                                                                value={item.questions}
                                                                onChange={(e) => handleInputChange(index, 'questions', e.target.value)}
                                                            />
                                                            <span className="text-danger fw-bold">{errors['description.questions']}</span>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="form-label">Answer</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Answer"
                                                                value={item.answers}
                                                                onChange={(e) => handleInputChange(index, 'answers', e.target.value)}
                                                            />
                                                            <span className="text-danger fw-bold">{errors['description.answers']}</span>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>

                                            <button type='button' onClick={addDropdown} className="btn btn-dark my-5">
                                                <i className='bi bi-plus mx-1'></i>
                                                Add More Question/Answer
                                            </button>

                                        </div>
                                    </div>
                                </div>



                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="request_limit_per_day">Request Limit Per Day</label>
                                            <input type="number"
                                                min={0}
                                                id='request_limit_per_day'
                                                className='form-control'
                                                placeholder='Request Limit Per Day'
                                                onChange={(e) => setData('request_limit_per_day', e.target.value)}
                                                value={data.request_limit_per_day}
                                                name='request_limit_per_day'
                                            />

                                            <span className="text-danger fw-bold">{errors.request_limit_per_day}</span>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="premium_customer_support">Premium Customer Support</label>
                                            <select name="premium_customer_support" onChange={(e) => setData('premium_customer_support', e.target.value)} value={data.premium_customer_support} className="form-control" id="">
                                                <option value={0}>No</option>
                                                <option value={1}>Yes</option>
                                            </select>

                                            <span className="text-danger fw-bold">{errors.premium_customer_support}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="max_cron_jobs">Max Cron Jobs</label>
                                            <input type="number"
                                                min={0}
                                                id='max_cron_jobs'
                                                className='form-control'
                                                placeholder='Max Cron Jobs'
                                                onChange={(e) => setData('max_cron_jobs', e.target.value)}
                                                value={data.max_cron_jobs}
                                                name='max_cron_jobs'
                                            />

                                            <span className="text-danger fw-bold">{errors.max_cron_jobs}</span>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="max_job_failed_before_disable">Max Job Failed Before Disable</label>
                                            <input type="number"
                                                min={0}
                                                id='max_job_failed_before_disable'
                                                className='form-control'
                                                placeholder='Max Failed Job Before Disable'
                                                onChange={(e) => setData('max_job_failed_before_disable', e.target.value)}
                                                value={data.max_job_failed_before_disable}
                                                name='max_job_failed_before_disable'
                                            />

                                            <span className="text-danger fw-bold">{errors.max_job_failed_before_disable}</span>
                                        </div>
                                    </div>



                                </div>

                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="is_active">Status</label>
                                            <select name="is_active"
                                                onChange={(e) => setData('is_active', e.target.value)}
                                                value={data.is_active}
                                                className="form-control choices"
                                                id="is_active"
                                            >
                                                <option value={1}>Enable</option>
                                                <option value={0}>Disable</option>
                                            </select>

                                            <span className="text-danger fw-bold">{errors.is_active}</span>
                                        </div>
                                    </div>

                                </div>

                                <SpinnerButton
                                    ButtonText={"Create Plan"}
                                    ButtonIcon={<i className="bi bi-save mx-1"></i>}
                                    Type={"submit"}
                                    processing={processing}
                                    CssClass={"btn btn-dark"}

                                />

                            </form>


                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
