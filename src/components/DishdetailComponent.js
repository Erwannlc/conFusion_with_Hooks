import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {



    renderDish(dish) {
        if (dish != null) 
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );

        else 
            return (
                <div></div>
            );
        
    }

    renderDishComment(dish) {
        if (dish != null ) {

           let comments = dish.comments.map((comment) => {
               const date = new Date(Date.parse(comment.date)).toDateString();
               
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
            <div>
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
            <div className="row">
            <div className="col-12 col-md-5">
                {this.renderDish(this.props.selectedDish)}
            </div>
            <div className="col-12 col-md-5">
                {this.renderDishComment(this.props.selectedDish)}
            </div>
            </div>
            

        )
}





}

export default Dishdetail;
