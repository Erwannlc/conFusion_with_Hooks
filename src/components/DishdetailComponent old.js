import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    componentDidMount() {
        console.log('Dishdetail componentDidMount invoked')
    }
    componentDidUpdate() {
        console.log('Dishdetail componentDidUpdate invoked')
    }

    renderDish(dish) {

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

    renderDishComment(comments) {
        if (comments != null ) {

           comments = comments.map((comment) => {
            //    const date = new Date(Date.parse(comment.date)).toDateString();
               const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
              
                return (
                    <li  key={comment.id}>
                    <p> -- {comment.author}, {date}</p>
                    <p>{comment.comment}</p>   
                    </li>

                    // <CardBody  key={comment.id}>
                    // <CardText>
                    //     -- {comment.author}, {date}
                    // </CardText>
                    // <CardText>{comment.comment}</CardText>   
                    // </CardBody>

                )
            });

            return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                {/* <h4>Comments on {this.props.dish.name}</h4> */}
                {/* <CardTitle>Comments on {dish.name}</CardTitle> */}
                {comments}
                </ul>
            </div>
            );

         } else {
            return (
                <div></div>
            )
        }
    }

    render() {
        if (this.props.dish != null) 
            return (
                <div className="container">
                <div className="row">
                    {this.renderDish(this.props.dish)}         
                    {this.renderDishComment(this.props.dish.comments)}
                </div>
                </div>
            );
        else 
            return (
                <div></div>
            );
    }
}

export default Dishdetail;
