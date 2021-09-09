import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import ShopFinder from '../api/ShopFinder';
import { ShopsContext } from '../context/ShopsContext';

const ShopsDetailPage = () => {
    const {selectedShop,setSelectedShop} = useContext(ShopsContext);
    const {id} = useParams();
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                // get shop by id for deatil page
                const response = await ShopFinder.get(`/${id}`);
                setSelectedShop(response.data.data.store);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);
    return (
        <div>
            {selectedShop && selectedShop.name}
        </div>
    )
}

export default ShopsDetailPage
