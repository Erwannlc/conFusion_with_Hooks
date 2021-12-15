import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderDish(dish) {
        if (dish != null) 
            return (
                <div className="col-12 col-md-5">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );

        else 
            return (
                <div></div>
            );
        
    }

    renderDishComment(dish) {
        if (dish != null ) {

           let comments = dish.comments.map((comment) => {
            //    const date = new Date(Date.parse(comment.date)).toDateString();
               const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
              
                return (
                    <CardBody  key={comment.id}>
                    <CardText>
                        -- {comment.author}, {date}
                    </CardText>
                    <CardText>{comment.comment}</CardText>   
                    </CardBody>

                )
            });

            return (
            <div className="col-12 col-md-5">
                <CardTitle>Comments on {dish.name}</CardTitle>
                {comments}
            </div>
            );

         } else {
            return (
                <div></div>
            )
        }
    }

    render() {

        return (
            <div className="container">
            <div className="row">
                {this.renderDish(this.props.dish)}         
                {this.renderDishComment(this.props.dish)}
            </div>
            </div>
            

        );
    }





}

export default Dishdetail;
