import React, { useState } from 'react'
import ShopFinder from '../api/ShopFinder';
import {useHistory, useLocation, useParams} from "react-router";

const AddReview = () => {
    const {id} = useParams();
    const location=useLocation();
    const history = useHistory();
    const [name,setName]=useState("");
    const [reviewText,setReviewText]=useState("");
    const [rating,setRating]=useState("Rating");

    // Adding new review
    const handleSubmitReview=async(e)=>{
        e.preventDefault();
        try{
            // adding new review
        const resp = await ShopFinder.post(`/${id}/addReview`,{
            name,
            review:reviewText,
            rating
        });
        // to refresh page with new review wrt to current page url
        history.push("/");
        history.push(location.pathname);
        console.log(resp);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">User's Name</label>
                        <input id="name" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="User's Name" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4">
                    <label htmlFor="rating">Rating</label>
                        <select id="rating" value={rating} onChange={(e)=>{setRating(e.target.value)}} className="custom-select">
                            <option disabled >Rating</option>
                            <option value="1">🌵</option>
                            <option value="2">🌵🌵</option>
                            <option value="3">🌵🌵🌵</option>
                            <option value="4">🌵🌵🌵🌵</option>
                            <option value="5">🌵🌵🌵🌵🌵</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea id="reviewText" value={reviewText} onChange={(e)=>{setReviewText(e.target.value)}} className="form-control">
                    </textarea>
                </div>
                <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview
