import React, { useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem , Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormsFormik } from './FormsWithFormik';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {  CSSTransition } from 'react-transition-group';



function RenderDish({dish, favorite, postFavorite}) {
    return (
        <div className="col-12 col-md-5 m-1">
         <CSSTransition in={true} classNames="card" timeout={300} appear>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : postFavorite(dish._id)}>
                            {favorite ?
                                <span className="fa fa-heart"></span>
                                : 
                                <span className="fa fa-heart-o"></span>
                            }
                        </Button>
                    </CardImgOverlay>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </CSSTransition>
        </div>
    )
}

function CommentForm (props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
         
    const MyTextInput = FormsFormik.MyTextInput
    const MyTextArea = FormsFormik.MyTextArea
    const MySelect = FormsFormik.MySelect
    
    return(
    <>
    
    <Button outline onClick={() => setIsModalOpen(true)}>
    <span className='fa fa-pencil fa-lg'></span>
    {' '} Submit Comment
    </Button>
    
    {/* nodeRef et ref (balise <Form>) sont là pour éviter le warning "findDOMNode is deprecated in StrictMode" dû à reactstrap sans doute cf. https://www.kindacode.com/article/react-warning-finddomnode-is-deprecated-in-strictmode/ */}
    <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)} > 
        <ModalHeader toggle={() => setIsModalOpen(false)} >Submit Comment</ModalHeader>
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
                    setSubmitting(false);
                    props.postComment(props.dishId, values.rating, values.author, values.comment);
                    console.log("dishId: " + props.dishId +"Current state: " + JSON.stringify(values, null, 2));
                    setIsDisabled(true)
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
                <Button type="submit" color='primary' disabled={isDisabled}>Submit</Button>
                
            </Form>
            </Formik>
        </ModalBody>
    </Modal>
    </>
    )
    
}

function RenderDishComment({comments, postComment, dishId}) {
    if (comments != null ) {
        
        comments = comments.map((comment, i) => {
            //    const date = new Date(Date.parse(comment.date)).toDateString();
               const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.updatedAt)));
              
                return (
                    <CSSTransition in={true} classNames="comments" appear>
                        <li  key={comment._id} style={{transitionDelay: `${200 * i}ms`}}>
                        <p>{comment.comment}</p>   
                        <p>{comment.rating} stars</p>   
                        <p> -- {comment.author.firstname} {comment.author.lastname} , {date}</p>
                        </li>
                    </CSSTransition>
                )
            });
    
            return (
                
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                {comments}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
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
    if (props.isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
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
                    <RenderDish dish={props.dish} favorite={props.favorite} postFavorite={props.postFavorite} />       
                    <RenderDishComment comments={props.comments}
                    postComment={props.postComment}
                    dishId={props.dish._id} />
                </div>
            </div>
        );
    else 
        return (
            <div></div>
        );
}


export default Dishdetail;
