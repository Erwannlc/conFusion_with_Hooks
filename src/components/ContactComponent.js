import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Col, Row} from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FormsFormik } from './FormsWithFormik';


const MyTextInput = FormsFormik.MyTextInput
const MyTextArea = FormsFormik.MyTextArea
const MyCheckbox = FormsFormik.MyCheckbox
const MySelect = FormsFormik.MySelect

const ContactLocalForm = () => {

    return(
        <Formik 
            initialValues={{
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: true,
            contactType: 'Tel.',
            message: '', 
            }}
            validationSchema={Yup.object({
                firstname: Yup.string()
                .max(10, "First Name should be <= 10 characters")
                .min(3, "First Name should be >= 3 characters")
                .required('Required'),
                lastname: Yup.string()
                .max(10, "Last Name should be <= 10 characters")
                .min(3, "Last Name should be >= 3 characters")
                .required('Required'),
                telnum: Yup.string()
                .matches(/[0-9]+/gi, "Enter number only")
                .min(3, "Tel number should contain more than 3 numbers")
                .required('Required'),
                email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                console.log("Current state: " + JSON.stringify(values, null, 2));
                alert("Current state: " + JSON.stringify(values, null, 2));
                setSubmitting(false);
            }}
        >

            <Form>
                <MyTextInput label="First Name" md="2" type="text" id="firstname" name="firstname" placeholder="First Name" />
                <MyTextInput label="Last Name"  md="2" type="text" id="lastname" name="lastname" placeholder="Last Name"  />
                <MyTextInput label="Contact Tel." md="2" type="tel" id="telnum" name="telnum" placeholder="Tel. Number" />
                <MyTextInput label="Email"  md="2" type="email" id="email" name="email" placeholder="Email" />

                <Row className="form-group"> 
                    <Col md={{size: 6, offset: 2}}>
                        <MyCheckbox name="agree"> {' '}
                        <strong>May we contact you ?</strong>
                        </MyCheckbox>
                    </Col>

                    <Col md={{size: 3, offset: 1}}>
                        <MySelect name="contactType">
                            <option>Tel.</option>
                            <option>Email</option>
                        </MySelect>
                    </Col>
                </Row>

            <MyTextArea label="Your Feedback" md="2" id="message" name="message" rows="12" />

            <Row className='form-group'>
                <Col md={{size: 10, offset: 2}}>
                    <Button type="submit" color="primary">Send Feed Back
                    </Button>            
                </Col>
            </Row>

            </Form>
        </Formik>
    )
}

class Contact extends Component {

    render() {
       
    return(
        <div className="container">
            <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                        <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Contact us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info" href="skype.com"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className='row row-content'>
                <div className='col-12'>
                    <h3>Send us your feedback</h3>
                </div>
                <div className='col-12 col-md-9'>
                    <ContactLocalForm />     
                </div>
            </div>
        </div>
    );
    }
}

export default Contact;