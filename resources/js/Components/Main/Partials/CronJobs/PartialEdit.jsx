import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import SpinnerButton from '../../MainComponents/SpinnerButton';
import { toast } from 'react-toastify';

export default function PartialEdit({ heading }) {

    const { user_id } = usePage().props;
    const { cronJob } = usePage().props;

    const parsed_schedule_execution = JSON.parse(cronJob.schedule_execution);
    const parsed_notify_when = JSON.parse(cronJob.notify_when);

    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        title: cronJob.title || "",
        url: cronJob.url || "",
        method: cronJob.method || "GET",
        schedule_execution: {
            type: parsed_schedule_execution.type || "",
            value: {
                minutes: parsed_schedule_execution.type === "minutes" && parsed_schedule_execution.value || "",
                hours: parsed_schedule_execution.type === "hours" && parsed_schedule_execution.value || "",
                months: {
                    months: parsed_schedule_execution.type === "months" && parsed_schedule_execution.value.months || "",
                    date: parsed_schedule_execution.type === "months" && parsed_schedule_execution.value.date || "",
                    hours: parsed_schedule_execution.type === "months" && parsed_schedule_execution.value.hours || "",
                    minutes: parsed_schedule_execution.type === "months" && parsed_schedule_execution.value.minutes || ""
                },

            }
        },
        is_enabled: cronJob.is_enabled,
        is_require_auth: cronJob.is_require_auth || false,
        auth_email: cronJob.auth_email || "",
        auth_password: cronJob.auth_password || "",
        auth_api_login_endpoint: cronJob.auth_api_login_endpoint || "",
        schedule_expiry_date: cronJob.schedule_expiry_date || "",
        user_id: user_id,
        notify_when: {
            execution_failed: parsed_notify_when.execution_failed,
            disable_after_too_many_failures: parsed_notify_when.disable_after_too_many_failures
        },

    });


    const [minutes, setMinutes] = useState([]);
    const [hours, sethours] = useState([]);
    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState([]);
    const [isExpiryDateToggle, setIsExpiryDateToggle] = useState(cronJob.schedule_expiry_date != null ? true : false);
    // const [next_executions, setNextExecutions] = useState([]);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const minutes = [];
        const hours = [];
        const days = [];
        const months = [];

        for (let i = 5; i <= 60; i += 5) {
            minutes.push(i);
        }

        for (let i = 1; i <= 24; i++) {
            hours.push(i);
        }

        for (let i = 1; i <= 30; i++) {
            days.push(i);
        }


        for (let i = 1; i <= 12; i++) {
            months.push(i);
        }



        if (cronJob.schedule_expiry_date != null) {
            setIsExpiryDateToggle(true);
        }

        setDays(days);
        setMonths(months);
        sethours(hours);
        setMinutes(minutes);



    }, []);


    // Changing Days Upon Month Change
    useEffect(() => {
        const currentYear = new Date().getFullYear(); // dynamic current year
        const numDays = new Date(currentYear, selectedMonth, 0).getDate();

        const tempDays = [];
        for (let i = 1; i <= numDays; i++) {
            tempDays.push(i);
        }
        setDays(tempDays);
    }, [selectedMonth]);



    // useEffect(() => {
    //     checkAllFieldsForMonthsNextExecution();
    // }, [data.schedule_execution.value.months])


    useEffect(() => {
        if (data.is_require_auth === false) {

            setData(prevData => ({
                ...prevData,
                auth_email: "",
                auth_password: "",
                auth_api_login_endpoint: ""
            }));
        }
    }, [data.is_require_auth]);


    useEffect(() => {
        if (isExpiryDateToggle === false) {
            setData(prevData => ({
                ...prevData,
                schedule_expiry_date: ""
            }));
        }
    }, [isExpiryDateToggle]);


    const handleChange = (e) => {
        const { name, value } = e.target;


        if (name === "schedule_execution.type") {
            setData(prevData => ({
                ...prevData,
                schedule_execution: {
                    type: value,
                    value: {
                        minutes: "",
                        hours: "",
                        months: {
                            months: "",
                            date: "",
                            hours: "",
                            minutes: ""
                        },

                    }
                }
            }));
        }

        if (name.startsWith("schedule_execution.value.minutes") && data.schedule_execution.type === "minutes") {
            setData(prevData => ({
                ...prevData,
                schedule_execution: {
                    type: "minutes",
                    value: {
                        ...prevData.schedule_execution.value,
                        minutes: value
                    }
                }
            }));

            // const executions = [];
            // for (let i = 1; i <= 4; i++) {
            //     const next = new Date(now.getTime() + value * i * 60 * 1000);
            //     executions.push(formatDate(next));
            // }
            // setNextExecutions(executions);


        }

        if (name.startsWith("schedule_execution.value.hours") && data.schedule_execution.type === "hours") {
            setData(prevData => ({
                ...prevData,
                schedule_execution: {
                    ...prevData.schedule_execution,
                    type: "hours",
                    value: {
                        ...prevData.schedule_execution.value,
                        hours: value
                    }
                }
            }));

            // const executions = [];
            // for (let i = 1; i <= 4; i++) {
            //     const next = new Date(now.getTime() + value * i * 60 * 60 * 1000);
            //     executions.push(formatDate(next));
            // }
            // setNextExecutions(executions);
        }


        if (name.startsWith("schedule_execution.value.months.months") && data.schedule_execution.type === "months") {
            setData(prevData => ({
                ...prevData,
                schedule_execution: {
                    ...prevData.schedule_execution,
                    type: "months",
                    value: {
                        ...prevData.schedule_execution.value,
                        months: {
                            ...prevData.schedule_execution.value.months,
                            months: value
                        }
                    }
                }
            }));
            setSelectedMonth(value);
        }


        if (name.startsWith("schedule_execution.value.months.date") && data.schedule_execution.type === "months") {
            setData(prevData => ({
                ...prevData,
                schedule_execution: {
                    ...prevData.schedule_execution,
                    type: "months",
                    value: {
                        ...prevData.schedule_execution.value,
                        months: {
                            ...prevData.schedule_execution.value.months,
                            date: value
                        }
                    }
                }
            }));
        }



        if (name.startsWith("schedule_execution.value.months.hours") && data.schedule_execution.type === "months") {
            setData(prevData => ({
                ...prevData,
                schedule_execution: {
                    ...prevData.schedule_execution,
                    type: "months",
                    value: {
                        ...prevData.schedule_execution.value,
                        months: {
                            ...prevData.schedule_execution.value.months,
                            hours: value
                        }
                    }
                }
            }));
        }

        if (name.startsWith("schedule_execution.value.months.minutes") && data.schedule_execution.type === "months") {
            setData(prevData => ({
                ...prevData,
                schedule_execution: {
                    ...prevData.schedule_execution,
                    type: "months",
                    value: {
                        ...prevData.schedule_execution.value,
                        months: {
                            ...prevData.schedule_execution.value.months,
                            minutes: value
                        }
                    }
                }
            }));
        }

    };



    // const formatDate = (date) => {
    //     return date.toLocaleString('en-US', {
    //         weekday: 'long',
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric',
    //         hour: 'numeric',
    //         minute: '2-digit',
    //         hour12: true,
    //     });
    // };


    // const checkAllFieldsForMonthsNextExecution = () => {
    //     if (data.schedule_execution.type === 'months') {
    //         const executions = [];

    //         const monthIncrement = parseInt(data.schedule_execution.value.months.months) || 1;
    //         const targetDate = parseInt(data.schedule_execution.value.months.date) || now.getDate();
    //         const targetHours = parseInt(data.schedule_execution.value.months.hours) || now.getHours();
    //         const targetMinutes = parseInt(data.schedule_execution.value.months.minutes) || now.getMinutes();

    //         for (let i = 1; i <= 4; i++) {
    //             const exec = new Date(now);
    //             exec.setMonth(exec.getMonth() + i * monthIncrement);

    //             const daysInMonth = new Date(exec.getFullYear(), exec.getMonth() + 1, 0).getDate();
    //             const validDate = Math.min(targetDate, daysInMonth);
    //             exec.setDate(validDate);
    //             exec.setHours(targetHours, targetMinutes, 0, 0);

    //             executions.push(formatDate(exec));
    //         }

    //         setNextExecutions(executions);
    //     }
    // };




    const submit = (e) => {
        e.preventDefault();

        if (isExpiryDateToggle && data.schedule_expiry_date === '') {
            toast.error("Please Enter Exipiry Date If Schedule Expiry is Enabled");
            return;
        }


        if (data.is_require_auth) {
            if (

                data.auth_email === "" || data.auth_password === ""
            ) {
                toast.error("Please Enter Email And Password If Authentication is Enabled");
                return;
            }
        }

        if (data.schedule_execution.type === "") {
            toast.error("Please Select Schedule Execution Type");
            return;
        }

        if (data.schedule_execution.type === "minutes" && data.schedule_execution.value.minutes === "") {
            toast.error("Please Select Minutes If Schedule Execution Type is Minutes");
            return;
        }



        if (data.schedule_execution.type === "hours" && data.schedule_execution.value.hours === "") {
            toast.error("Please Select Hours If Schedule Execution Type is Hours");
            return;
        }

        if (data.schedule_execution.type === "months") {
            if (

                data.schedule_execution.value.months.months === ""
                || data.schedule_execution.value.months.date === ""
                || data.schedule_execution.value.months.hours === ""
                || data.schedule_execution.value.months.minutes === ""

            ) {
                toast.error("Please Select Each Field If Schedule Execution Type is Months");
                return;
            }

        }


        post(route('cron-jobs.update', cronJob.id), data);

    }


    const copy = (id) => {
        router.post(route("cron-jobs.copy", id));
    }




    return (
        <>

            <div className="container">

                <div className="d-flex justify-content-between flex-wrap">
                    <h3>{heading}</h3>

                    <div>

                        <button href={route('cron-jobs.index')} className="btn btn-dark mx-2 " onClick={() => copy(cronJob.id)}>
                            <i className="bi bi-clipboard-check mx-1"></i>
                            Copy This Job
                        </button>

                        <Link href={route('cron-jobs.index')} className="btn btn-dark ">
                            <i className="bi bi-arrow-bar-left mx-1"></i>
                            Back To CronJob
                        </Link>

                    </div>


                </div>

                <form onSubmit={submit}>

                    <input type="text"
                        name='method'
                        value={data.method}
                        onChange={(e) => setData('method', e.target.value)}
                        hidden />

                    <div className="row my-3">
                        <div className="col-md-12">
                            <div className="card shadow-lg">
                                <div className="card-body">

                                    <div className="mb-3">
                                        <label htmlFor='title' className="form-label">Title</label>
                                        <input type="text"
                                            id='title'
                                            className="form-control"
                                            placeholder='Enter Your Title For This Cron Job'
                                            name='title'
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                        />

                                        <span className="text-danger fw-bold">{errors.title}</span>
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor='url' className="form-label">URL <span className="text-danger">*</span></label>
                                        <input type="text"
                                            id='url'
                                            className="form-control"
                                            placeholder='Example: https://example.com'
                                            name='url'
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                        />
                                        <span className="text-danger fw-bold">{errors.url}</span>
                                    </div>

                                    <div className="my-3">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input"
                                                type="checkbox"
                                                id="is_enabled"
                                                checked={data.is_enabled}
                                                name='is_enabled'
                                                onChange={(e) => { setData("is_enabled", e.target.checked) }}
                                            />
                                            <label className="form-check-label" htmlFor="is_enabled">Cron Job Enabled</label>
                                        </div>
                                        <span className="text-danger fw-bold">{errors.is_enabled}</span>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="row my-3">
                        <div className="col-md-12">
                            <div className="card shadow-lg">
                                <div className="card-header">
                                    <h6>Execution Schedule <span className="text-danger">*</span></h6>
                                </div>
                                <div className="card-body">
                                    <div className="row">


                                        <div className="col-md-8">


                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="d-flex align-items-center gap-1">

                                                        <div className="radio-input">
                                                            <input
                                                                type="radio"
                                                                id="minutes_radio"
                                                                name="schedule_execution.type"
                                                                value="minutes"
                                                                onChange={handleChange}
                                                                checked={data.schedule_execution.type === "minutes"}
                                                            />

                                                        </div>

                                                        <label htmlFor='minutes_radio' className="mb-0">Every</label>
                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.minutes'
                                                            value={data.schedule_execution.value.minutes}
                                                            onChange={handleChange}
                                                            disabled={data.schedule_execution.type !== "minutes"}


                                                        >
                                                            <option value="" ></option>
                                                            {
                                                                minutes.map((minute, index) => (
                                                                    <option key={index} value={minute}>{minute}</option>
                                                                ))
                                                            }

                                                        </select>
                                                        <label htmlFor='minutes_radio' className="mb-0">minute(s)</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="d-flex align-items-center gap-1">

                                                        <div className="radio-input">

                                                            <input type="radio"
                                                                id='hours_radio'
                                                                name="schedule_execution.type"
                                                                value="hours"
                                                                onChange={handleChange}
                                                                checked={data.schedule_execution.type === "hours"}

                                                            />

                                                        </div>
                                                        <label htmlFor='hours_radio' className="mb-0">Every</label>
                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.hours'
                                                            value={data.schedule_execution.value.hours}
                                                            onChange={handleChange}
                                                            disabled={data.schedule_execution.type !== "hours"}
                                                        >
                                                            <option value="" ></option>
                                                            {
                                                                hours.map((minute, index) => (
                                                                    <option key={index} value={minute}>{minute}</option>
                                                                ))
                                                            }

                                                        </select>
                                                        <label htmlFor='hours_radio' className="mb-0">Hour(s)</label>
                                                    </div>
                                                </div>
                                            </div>


                                            <hr />

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="d-flex align-items-center gap-1">

                                                        <div className="radio-input">
                                                            <input type="radio"
                                                                id='months_radio'
                                                                name="schedule_execution.type"
                                                                value="months"
                                                                onChange={handleChange}
                                                                checked={data.schedule_execution.type === "months"}
                                                            />

                                                        </div>

                                                        <label htmlFor='months_radio' className="mb-0">Every Month</label>
                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.months.months'
                                                            value={data.schedule_execution.value.months.months}
                                                            onChange={handleChange}
                                                            disabled={data.schedule_execution.type !== "months"}

                                                        >
                                                            <option value="" ></option>
                                                            {
                                                                months.map((month, index) => (
                                                                    <option key={index} value={month}>{month}</option>
                                                                ))
                                                            }

                                                        </select>
                                                        <label htmlFor='months_radio' className="mb-0">Date </label>

                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.months.date'
                                                            value={data.schedule_execution.value.months.date}
                                                            onChange={handleChange}
                                                            disabled={data.schedule_execution.type !== "months"}
                                                        >
                                                            <option value="" ></option>
                                                            {
                                                                days.map((day, index) => (
                                                                    <option key={index} value={day}>{day}</option>
                                                                ))
                                                            }

                                                        </select>
                                                        <label htmlFor='months_radio' className="mb-0"> Hours</label>
                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.months.hours'
                                                            value={data.schedule_execution.value.months.hours}
                                                            onChange={handleChange}
                                                            disabled={data.schedule_execution.type !== "months"}
                                                        >
                                                            <option value="" ></option>
                                                            {
                                                                hours.map((hour, index) => (
                                                                    <option key={index} value={hour}>{hour}</option>
                                                                ))
                                                            }

                                                        </select>


                                                        <label htmlFor='months_radio' className="mb-0">Minutes</label>
                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.months.minutes'
                                                            value={data.schedule_execution.value.months.minutes}
                                                            onChange={handleChange}
                                                            disabled={data.schedule_execution.type !== "months"}
                                                        >
                                                            <option value="" ></option>
                                                            {
                                                                minutes.map((minute, index) => (
                                                                    <option key={index} value={minute}>{minute}</option>
                                                                ))
                                                            }

                                                        </select>

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row mt-5">
                                                <div className="col-md-12">
                                                    <div className="my-3">
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input"
                                                                type="checkbox"
                                                                id="schedule_expiry_toggle"
                                                                checked={isExpiryDateToggle}
                                                                onChange={(e) => { setIsExpiryDateToggle(e.target.checked) }}
                                                            />
                                                            <label className="form-check-label" htmlFor="schedule_expiry_toggle">Schedule Expiry</label>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>


                                            {
                                                isExpiryDateToggle &&
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="my-3">
                                                            <label htmlFor="schedule_expiry_date">Set Schedule Expiry Date <span className="text-danger">*</span></label>
                                                            <input type="datetime-local"
                                                                className='form-control cursor-pointer'
                                                                onChange={(e) => setData("schedule_expiry_date", e.target.value)}
                                                                value={data.schedule_expiry_date}
                                                            />

                                                            <span className="text-danger">{errors.schedule_expiry_date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                        </div>



                                        {/* <div className="col-md-4">
                                            <div className="card shadow-lg">
                                                <div className="card-header">
                                                    <h6>Next Executions</h6>
                                                    {

                                                        next_executions.map((next_execution, index) => {
                                                            return (
                                                                <p key={index}>{next_execution} </p>
                                                            )
                                                        })

                                                    }
                                                </div>

                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row my-3">

                        <div className="col-md-12">
                            <div className="card shadow-lg">
                                <div className="card-header"> <h6>HTTP Authentication</h6></div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">

                                            <div className="form-check form-switch">
                                                <input className="form-check-input"
                                                    type="checkbox"
                                                    id="is_require_auth"
                                                    name='is_require_auth'
                                                    checked={data.is_require_auth}
                                                    onChange={(e) => { setData("is_require_auth", e.target.checked) }}
                                                />
                                                <label className="form-check-label" htmlFor="is_require_auth">HTTP Authentication Required</label>
                                            </div>



                                        </div>
                                    </div>


                                    {data.is_require_auth &&

                                        <>
                                            <div className="row mt-3">
                                                <div className="col-md-12">


                                                    <div className="mb-3">
                                                        <label htmlFor="auth_api_login_endpoint"> Api Login Endpoint <span className="text-danger">*</span></label>
                                                        <input type="url"
                                                            className='form-control'
                                                            placeholder='https://example.com/login'
                                                            name='auth_api_login_endpoint'
                                                            value={data.auth_api_login_endpoint}
                                                            onChange={(e) => setData("auth_api_login_endpoint", e.target.value)}
                                                        />

                                                        <span className="text-danger">{errors.auth_api_login_endpoint}</span>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="auth_email">Username / Email <span className="text-danger">*</span></label>
                                                        <input type="email"
                                                            className='form-control'
                                                            placeholder='yourEmail@email.com'
                                                            name='auth_email'
                                                            autoComplete='current-email'
                                                            value={data.auth_email}
                                                            onChange={(e) => setData("auth_email", e.target.value)}
                                                        />

                                                        <span className="text-danger">{errors.auth_email}</span>
                                                    </div>


                                                    <div className="mb-3">
                                                        <label htmlFor="auth_password">Password <span className="text-danger">*</span></label>
                                                        <input type="password"
                                                            className='form-control'
                                                            placeholder='**********'
                                                            name='auth_password'
                                                            autoComplete='current-password'
                                                            value={data.auth_password}
                                                            onChange={(e) => setData("auth_password", e.target.value)}
                                                        />

                                                        <span className="text-danger">{errors.auth_password}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }



                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="row my-3">

                        <div className="col-md-12">
                            <div className="card shadow-lg">
                                <div className="card-header">  <h6>Notify When</h6></div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input"
                                                    type="checkbox"
                                                    id="notify_when.execution_failed"
                                                    name='notify_when.execution_failed'
                                                    onChange={(e) => { setData("notify_when.execution_failed", e.target.checked) }}
                                                    checked={data.notify_when.execution_failed}
                                                />
                                                <label className="form-check-label" htmlFor="notify_when.execution_failed">Notify When job Execution Failed</label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row my-3">
                                        <div className="col-md-12">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input"
                                                    type="checkbox"
                                                    id="notify_when.disable_after_too_many_failures"
                                                    name='notify_when.disable_after_too_many_failures'
                                                    onChange={(e) => { setData("notify_when.disable_after_too_many_failures", e.target.checked) }}
                                                    checked={data.notify_when.disable_after_too_many_failures}
                                                />
                                                <label className="form-check-label" htmlFor="notify_when.disable_after_too_many_failures">
                                                    Cron Job Will Be Disabled Because Of Too Many Failures
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="row">
                        <div className="col-md-12">
                            <SpinnerButton
                                ButtonIcon={<i className="bi bi-pencil mx-2"></i>}
                                ButtonText={"Update Cron Job"}
                                processing={processing}
                                Type={"submit"}
                                CssClass={"btn-dark"}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )



}
