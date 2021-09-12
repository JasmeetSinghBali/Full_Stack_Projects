import React from 'react'

const StarRating = ({rating}) => {
    const stars = [];
    for (let i=1;i<=5;i++){
        if(i <= rating){
            // push until the rating given by user
            stars.push(<i key={i} className="fas fa-star text-warning"></i>);
        }else if(i === Math.ceil(rating)&& !Number.isInteger(rating)){
            // so if the rating is in decimal & equal to the ceiling of rating
            //like for 2.3 stars when i=3 then i===math.ceil(2.3) so push half rated star
            stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>);
        }else{
            // if user gave 4 stars out of 5 the if part will push 
            // 4 filled star
            // and then push a empty 5th star
            stars.push(<i key={i} className="far fa-star text-warning"></i>);
        }
    }
    return (
        <>
            {stars}
        </>
    )
}

export default StarRating
