import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import ReusableTextInput from '../../app/common/form/ReusableTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error =>
                setErrors({error: 'Neteisingas e.paštas arba slaptažodis'}))}>
            {({handleSubmit, isSubmitting, errors}) =>
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Prisijungti' color='blue' textAlign='center' />
                    <ReusableTextInput name='email' placeholder='Elektroninis paštas' />
                    <ReusableTextInput name='password' placeholder='Slaptažodis' type='password' />
                    <ErrorMessage
                        name='error' render={() =>
                        <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
                    />
                    <Button loading={isSubmitting} positive content='Patvirtinti' type='submit' fluid />
                </Form>    
            }
        </Formik>
    )
})