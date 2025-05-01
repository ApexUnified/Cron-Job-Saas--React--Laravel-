import { Link, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function PartialCreate({ heading }) {

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        url: "",
        schedule_execution: {
            type: "",
            value: {
                minutes: "",
                hours: "",
                days: {
                    days: "",
                    hours: "",
                    minutes: ""
                },
                years: {
                    years: "",
                    months: "",
                    days: "",
                    hours: "",
                    minutes: ""
                }
            }
        }

    });


    const [minutes, setMinutes] = useState([]);
    const [hours, sethours] = useState([]);
    const [days, setDays] = useState([]);


    useEffect(() => {
        const minutes = [];
        const hours = [];
        const days = [];

        for (let i = 5; i <= 60; i += 5) {
            minutes.push(i);
        }

        for (let i = 2; i <= 24; i++) {
            hours.push(i);
        }

        for (let i = 1; i <= 30; i++) {
            days.push(i);
        }


        setDays(days);
        sethours(hours);
        setMinutes(minutes);

    }, []);


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
                        days: {
                            days: "",
                            hours: "",
                            minutes: ""
                        },
                        years: {
                            years: "",
                            months: "",
                            days: "",
                            hours: "",
                            minutes: ""
                        }
                    }
                }
            }));
        }

        if (name.startsWith("schedule_execution.value.minutes")) {
            console.log("Minutes Running");
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
        }

        if (name.startsWith("schedule_execution.value.hours")) {
            console.log("Hours Running");
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
        }

        if (name.startsWith("schedule_execution.value.days.")) {
            console.log("days Running");
            setData(prevData => ({
                ...prevData,
                schedule_execution: {
                    ...prevData.schedule_execution,
                    type: "days",
                    value: {
                        ...prevData.schedule_execution.value,
                        days: {
                            ...prevData.schedule_execution.value.days,
                            days: value
                        }
                    }
                }
            }));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
    }




    return (
        <>



            <div className="container">

                <div className="d-flex justify-content-between flex-wrap">
                    <h3>{heading}</h3>
                    <Link href={route('cron-jobs.index')} className="btn btn-dark ">
                        <i className="bi bi-arrow-bar-left mx-1"></i>
                        Back To CronJob
                    </Link>
                </div>

                <form onSubmit={submit}>
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
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor='url' className="form-label">URL</label>
                                        <input type="text"
                                            id='url'
                                            className="form-control"
                                            placeholder='Example: https://example.com'
                                            name='url'
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                        />
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row my-3">
                        <div className="col-md-12">
                            <div className="card shadow-lg">
                                <div className="card-header">
                                    <h6>Execution Schedule</h6>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="d-flex align-items-center gap-1">
                                                        <input
                                                            type="radio"
                                                            id="minutes_radio"
                                                            name="schedule_execution.type"
                                                            value="minutes"
                                                            onChange={handleChange}

                                                        />

                                                        <label htmlFor='minutes_radio' className="mb-0">Every</label>
                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.minutes'
                                                            value={data.schedule_execution.value.minutes}
                                                            onChange={handleChange}


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
                                                        <input type="radio"
                                                            id='hours_radio'
                                                            name="schedule_execution.type"
                                                            value="hours"

                                                            onChange={handleChange}

                                                        />
                                                        <label htmlFor='hours_radio' className="mb-0">Every</label>
                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.hours'
                                                            value={data.schedule_execution.value.hours}
                                                            onChange={handleChange}
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
                                                        <input type="radio"
                                                            id='days_radio'
                                                            name="schedule_execution.type"
                                                            value="days"

                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor='days_radio' className="mb-0">Every</label>
                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.days.days'
                                                            value={data.schedule_execution.value.days.days}
                                                            onChange={handleChange}

                                                        >
                                                            <option value="" ></option>
                                                            {
                                                                days.map((day, index) => (
                                                                    <option key={index} value={day}>{day}</option>
                                                                ))
                                                            }

                                                        </select>
                                                        <label htmlFor='days_radio' className="mb-0">Of The Month At</label>

                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.days.hours'
                                                            value={data.schedule_execution.value.days.hours}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="" ></option>
                                                            {
                                                                hours.map((hour, index) => (
                                                                    <option key={index} value={hour}>{hour}</option>
                                                                ))
                                                            }

                                                        </select>
                                                        :
                                                        <select className="form-select form-select-sm w-auto mx-1"
                                                            style={{ paddingRight: "1.5rem" }}
                                                            name='schedule_execution.value.days.minutes'
                                                            value={data.schedule_execution.value.days.minutes}
                                                            onChange={handleChange}
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

                                        </div>
                                        <div className="col-md-4">
                                            <button type="submit">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
