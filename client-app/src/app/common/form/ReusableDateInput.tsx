import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, {ReactDatePickerProps, registerLocale} from 'react-datepicker';
import lt from 'date-fns/locale/lt';
registerLocale("lt", lt);

export default function ReusableDateInput(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);

    return(
        <Form.Field error={meta.touched && !!meta.error}>       
            <DatePicker
            locale="lt"            
            {...field}         
            {...props}        
            selected={(field.value && new Date(field.value)) || null}
            onChange={value => helpers.setValue(value)}                                  
            />                              
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}