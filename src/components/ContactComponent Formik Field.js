import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

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
                <Row className="form-group"> 
                <Label htmlFor="firstname" md={2}>First Name</Label>
                <Col md={10}>
                <Field type="text" id="firstname" name="firstname" placeholder="First Name" className="form-control"/>
                <div className='invalid-feedback'><ErrorMessage name="firstname" /></div>
                </Col>
                </Row>

                <Row className="form-group"> 
                <Label htmlFor="lastname" md={2}>Last Name</Label>
                <Col md={10}>
                <Field type="text" id="lastname" name="lastname" placeholder="Last Name"  className="form-control"/>
                <div className='error'><ErrorMessage className='error' name="lastname" /></div>
                </Col>
                </Row>

                <Row className="form-group">
                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                <Col md={10}>
                <Field type="tel" id="telnum" name="telnum" placeholder="Tel. Number"  className="form-control" />
                <div className='error'><ErrorMessage name="telnum" /></div>
                </Col>
                </Row> 

                <Row className="form-group"> 
                <Label htmlFor="email" md={2}>Email</Label>
                <Col md={10}>
                <Field type="email" id="email" name="email" placeholder="Email"  className="form-control"/>
                <div className='error'><ErrorMessage name="email" /></div>
                </Col>
                </Row>

                <Row className="form-group"> 
                    <Col md={{size: 6, offset: 2}}>
                        <div className="form-check">
                        <Label check>
                            <Field type="checkbox" name="agree" className="form-check-input"/> {' '}
                            <strong>May we contact you ?</strong>  
                        </Label>
                        </div>                         
                    </Col>
                    <Col md={{size: 3, offset: 1}}>
                        <Field as="select" name="contactType" className="form-control">
                            <option>Tel.</option>
                            <option>Email</option>
                        </Field>                      
                    </Col>
                </Row>
                
                <Row className="form-group"> 
                <Label htmlFor="message" md={2}>Your feedback</Label>
                <Col md={10}>
                    <Field as="textarea" id="message" name="message" rows="12" className="form-control" />
                </Col>
                </Row>
                
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