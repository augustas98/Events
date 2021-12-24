import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ReusableTextInput from "../../app/common/form/ReusableTextInput";
import ReusableTextArea from "../../app/common/form/ReusableTextArea";
interface Props {
    setEditMode: (editMode: boolean) => void;
}
export default observer(function ProfileEditForm({ setEditMode }: Props) {
    const { profileStore: { profile, editProfile } } = useStore();
    return (
        <Formik
            initialValues={{
                displayName: profile?.displayName, bio:
                    profile?.bio
            }}
            onSubmit={values => {
                editProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form className='ui form'>
                    <ReusableTextInput placeholder='Display Name'
                        name='displayName' />
                    <ReusableTextArea rows={3} placeholder='Add your bio'
                        name='bio' />
                    <Button
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content='Atnaujinti'
                        floated='right'
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    )
})