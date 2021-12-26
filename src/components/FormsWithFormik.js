import React from 'react';
import { Label, Col, Row} from 'reactstrap';
import { useField } from 'formik';


export const FormsFormik = {

 MyTextInput: ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <>
        <Row className="form-group"> 
        <Label htmlFor={props.id || props.name} md={props.md}>{label}</Label>
        <Col md={10}>
        <input className="form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
        </Col>
        </Row>
      </>
    );
},

 MyTextArea: ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
             <Row className="form-group"> 
            <Label htmlFor={props.id || props.name} md={props.md}>{label}</Label>
            <Col md={10}>
            <textarea className="form-control" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
            </Col>
            </Row>
        </>
    );
  },
  
 MyCheckbox: ({ children, ...props }) => {
// React treats radios and checkbox inputs differently other input types, select, and textarea.
// Formik does this too! When you specify `type` to useField(), it will
// return the correct bag of props for you -- a `checked` prop will be included
// in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div className="form-check">
        <Label check>
            <input type="checkbox" {...field} {...props} className="form-check-input"/>
            {children}
        </Label>
        {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
        ) : null}
        </div>
    );
},

 MySelect: ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Row className='form-group'>
        <Label htmlFor={props.id || props.name} md={props.md}>{label}</Label>
        <Col md={10}>
        <select {...field} {...props} className="form-control"/>
        {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
        ) : null}
        </Col>
        </Row>
    );
}

}