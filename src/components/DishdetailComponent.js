import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem , Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormsFormik } from './FormsWithFormik';

// import { render } from '@testing-library/react';

function RenderDish({dish}) {
    return (
        <div className="col-12 col-md-5 m-1">
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
    )
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    } 

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin(event) {
        this.toggleModal()
        alert("Username: " + this.username.value + "Password: " + this.password + " Remember: " + this.remember.checked)
        event.preventDefault()
    }

    render() {
        const MyTextInput = FormsFormik.MyTextInput
        const MyTextArea = FormsFormik.MyTextArea
        const MySelect = FormsFormik.MySelect
        
        return(
        <>
        
        <Button outline onClick={this.toggleModal}>
        <span className='fa fa-pencil fa-lg'></span>
        {' '} Submit Comment
        </Button>
        
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <Formik
                    initialValues={{
                    rating: 1,
                    author: '',
                    comment: '',
                    }}
                    validationSchema={Yup.object({
                        author: Yup.string()
                        .max(15, "Your Name should be <= 15 characters")
                        .min(3, "Your Name should be >= 3 characters")
                        .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log("Current state: " + JSON.stringify(values, null, 2));
                        alert("Current state: " + JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }}
                >
                <Form>

                    <MySelect label="Rating" name="rating">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </MySelect>
                    <MyTextInput label="Your Name" type="text" name="author" placeholder="Your Name"/>
                    <MyTextArea label="Comment" name="comment" rows="6"/>
                    <Button type="submit" color='primary'>Submit</Button>
                    
                </Form>
                </Formik>
            </ModalBody>
        </Modal>
        </>
        )
    }
}

function RenderDishComment({comments}) {
    if (comments != null ) {
        
        comments = comments.map((comment) => {
            //    const date = new Date(Date.parse(comment.date)).toDateString();
               const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
              
                return (
                    <li  key={comment.id}>
                    <p> -- {comment.author}, {date}</p>
                    <p>{comment.comment}</p>   
                    </li>
                )
            });
    
            return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                {comments}
                </ul>
                <CommentForm/>
                <p><br></br></p>
            </div>
            
            );
    
    } else {
        return (
            <div></div>
        )
    };
}


function Dishdetail(props) {
    if (props.dish != null) 
        return (
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />       
                    <RenderDishComment comments={props.comments} />
                    
                    

                </div>
            </div>
        );
    else 
        return (
            <div></div>
        );
}





export default Dishdetail;
