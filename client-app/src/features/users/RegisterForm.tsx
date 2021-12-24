import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';
import ReusableTextInput from '../../app/common/form/ReusableTextInput';

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
                setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Registracija' color='blue' textAlign='center' />
                    <ReusableTextInput name='displayName' placeholder='Vaizduojamas vardas' />
                    <ReusableTextInput name='username' placeholder='Naudotojo vardas' />
                    <ReusableTextInput name='email' placeholder='Elektroninis paštas' />
                    <ReusableTextInput name='password' placeholder='Slaptažodis' type='password' />
                    <ErrorMessage 
                        name='error' render={() => 
                        <ValidationErrors errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} positive content='Patvirtinti' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})