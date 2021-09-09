import React,{useContext, useEffect} from 'react'
import { ShopsContext } from '../context/ShopsContext';
import ShopFinder from '../api/ShopFinder';
import {useHistory} from 'react-router-dom';

const ShopList = (props) => {
    const {shops,setShops} = useContext(ShopsContext);
    const history = useHistory();
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const resp = await ShopFinder.get("/");
                setShops(resp.data.data.stores);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);

    const handleDelete = async(e,id)=>{
        // so that the detail page is not displayed on clicking delete button
        e.stopPropagation();
        try{
            const resp = await ShopFinder.delete(`/${id}`);
            // add all the shops to the shops useState except the id that we deleted
            setShops(shops.filter(shop=>{
                return shop.id !== id;
            }));
            
        }catch(err){
            console.log(err);
        }
    }

    const handleUpdate = async(e,id)=>{
        // so that the detail page is not displayed on clicking delete button
        e.stopPropagation();
        try{
            // navigate to the update route
            // push the update route page in the history stack
            history.push(`/shops/${id}/update`);
            
        }catch(err){
            console.log(err);
        }
    }
    
    // navigate to shop details page for specific shop id
    const handleShopSelect = (id)=>{
        history.push(`shops/${id}`);
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-info">
                <thead>
                    <tr className="bg-primar">
                        <th scope="col">Shop</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Contacts</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {shops && shops.map((shop)=>{
                        return(
                        <tr onClick={()=>handleShopSelect(shop.id)} key={shop.id}>
                            <td>{shop.name}</td>
                            <td>{shop.location}</td>
                            <td>{"$".repeat(shop.price_range)}</td>
                            <td>{shop.contact}</td>
                            <td>reviews</td>
                            <td><button onClick={(e)=> handleUpdate(e,shop.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={(e) => handleDelete(e,shop.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                        )
                    })}
                    {/* <tr>
                        <td>Something1</td>
                        <td>Somewhere</td>
                        <td>$$</td>
                        <td>Ratings</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                        <td>Something1</td>
                        <td>Somewhere</td>
                        <td>$$</td>
                        <td>Ratings</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                        <td>Something1</td>
                        <td>Somewhere</td>
                        <td>$$</td>
                        <td>Ratings</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default ShopList
