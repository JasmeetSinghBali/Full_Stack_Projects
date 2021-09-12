import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import ShopFinder from '../api/ShopFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { ShopsContext } from '../context/ShopsContext';

const ShopsDetailPage = () => {
    const {selectedShop,setSelectedShop} = useContext(ShopsContext);
    const {id} = useParams();
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                // get shop by id for deatil page
                const response = await ShopFinder.get(`/${id}`);
                setSelectedShop(response.data.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);
    return (
        <div>
            {selectedShop && (
                <>
                <h1 className="text-center display-1">{selectedShop.store.name}</h1>
                <div className="text-center">
                    <StarRating rating={selectedShop.store.average_rating}/>
                    <span className="text-danger ml-1">
                            {selectedShop.store.count ? `(${selectedShop.store.count})`: "(0)" }
                    </span>
                </div>
                    <div className="mt-3">
                        <Reviews reviews={selectedShop.reviews} />
                    </div>
                    <AddReview />
                </>
                )}
        </div>
    )
}

export default ShopsDetailPage
