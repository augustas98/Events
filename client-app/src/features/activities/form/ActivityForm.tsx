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
        title: Yup.string().required('Pavadinimas yra privalomas'),
        description: Yup.string().required('Aprašymas yra privalomas'),
        category: Yup.string().required('Kategorija yra privaloma'),
        date: Yup.string().required('Data yra privaloma').nullable(),
        city: Yup.string().required('Miestas yra privalomas'),
        venue: Yup.string().required('Vieta yra privaloma')
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
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity!)))
    }, [id, loadActivity]);

    if (loadingInitial) return <LoadingComponent content='Kraunasi...' />

    return (
        <Segment clearing>
            <Header content='Renginio detalės' sub color='blue' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <ReusableTextInput name='title' placeholder='Pavadinimas' />
                        <ReusableTextArea rows={3} placeholder='Aprašymas' name='description' />
                        <ReusableSelectInput options={categoryOptions} placeholder='Kategorija' name='category' />
                        <ReusableDateInput
                            placeholderText='Data'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy HH:mm'
                            timeFormat='HH:mm'
                        />
                        <Header content='Vietos detalės' sub color='blue' />
                        <ReusableTextInput placeholder='Miestas' name='city' />
                        <ReusableTextInput placeholder='Vieta' name='venue' />
                        <Button
                            disabled={isSubmitting || !isValid || !dirty}

                            loading={isSubmitting} floated='right' positive type='submit' content='Patvirtinti'
                        />
                        <Button as={Link} to='/activities' floated='right' type='submit' content='Atšaukti' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})