import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import ReusableTextInput from "../../../app/common/form/ReusableTextInput";
import ReusableTextArea from "../../../app/common/form/ReusableTextArea";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import ReusableSelectInput from "../../../app/common/form/ReusableSelectInput";
import ReusableDateInput from "../../../app/common/form/ReusableDateInput";
import { ActivityFormValues } from "../../../app/models/activity";

export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity, updateActivity,
         loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required('Category is required'),
        date: Yup.string().required('Date is required').nullable(),
        city: Yup.string().required('City is required'),
        venue: Yup.string().required('Venue is required')
    })

    function handleFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    if (loadingInitial) return <LoadingComponent content='Loading...' />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <ReusableTextInput name='title' placeholder='Title' />
                        <ReusableTextArea rows={3} placeholder='Description' name='description' />
                        <ReusableSelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <ReusableDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy HH:mm'
                            timeFormat='HH:mm'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <ReusableTextInput placeholder='City' name='city' />
                        <ReusableTextInput placeholder='Venue' name='venue' />
                        <Button
                            disabled={isSubmitting || !isValid || !dirty}

                            loading={isSubmitting} floated='right' positive type='submit' content='Submit'
                        />
                        <Button as={Link} to='/activities' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})