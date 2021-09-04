import React,{useContext, useEffect} from 'react'
import { ShopsContext } from '../context/ShopsContext';
import ShopFinder from '../api/ShopFinder';


const ShopList = (props) => {
    const {shops,setShops} = useContext(ShopsContext);
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const resp = await ShopFinder.get("/");
                setShops(resp.data.data.stores);
            }catch(err){
    
            }
        }
        fetchData();
    },[]);

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
                        <tr key={shop.id}>
                            <td>{shop.name}</td>
                            <td>{shop.location}</td>
                            <td>{"$".repeat(shop.price_range)}</td>
                            <td>{shop.contact}</td>
                            <td>reviews</td>
                            <td><button className="btn btn-warning">Update</button></td>
                            <td><button className="btn btn-danger">Delete</button></td>
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
