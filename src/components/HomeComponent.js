import React from "react";
import { Card, CardBody, CardImg, CardTitle, CardText, CardSubtitle } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import {  CSSTransition } from 'react-transition-group';

function RenderCard({item, isLoading, errMess}) {
    
    if (isLoading) {
        return(
            <Loading />
        )
    }
    else if (errMess) {
        return(
            <h4>{errMess}</h4>
        )
    }
    else
    // setInProp(true)
        return(
            <CSSTransition in={true} classNames="card" timeout={300} appear>
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </CSSTransition>
        )
}

function Home(props) {
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">    
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErrMess}/>    
                </div>    
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={props.promosLoading} errMess={props.promosErrMess}/>    
                </div>    
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.leadersLoading} errMess={props.leadersErrMess}/>    
                </div>    
            </div>
        </div>
    )
}

export default Home;