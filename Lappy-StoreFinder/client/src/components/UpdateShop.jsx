import React, {  useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import ShopFinder from '../api/ShopFinder';


const UpdateShop = (props) => {
    const {id} = useParams();
    let history = useHistory();
    const [name,setName] = useState("");
    const [location,setLocation] = useState("");
    const [contact,setContact] = useState();
    const [priceRange,setPriceRange] = useState();
    // const test = useParams();
    // console.log(test);

    // to get old data for a specific shop
    useEffect(()=>{
        const fetchData = async()=>{
            // get shop by id
            const resp = await ShopFinder.get(`/${id}`);
            //console.log(resp.data.data.store);
            setName(resp.data.data.store.name)
            setLocation(resp.data.data.store.location)
            setContact(resp.data.data.store.contact)
            setPriceRange(resp.data.data.store.price_range)
        }
        fetchData();
    }, []);

    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            const resp = await ShopFinder.put(`/${id}`,{
            name: name,
            location:location,
            contact:contact,
            price_range:priceRange
        });
        // console.log(resp);
        // back to the initial page shopList
        history.push("/");
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        className="form-control"
                        type="text"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        id="location"
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        id="contact"
                        className="form-control"
                        type="number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        id="price_range"
                        className="form-control"
                    >
                        <option disabled>Price Range</option>
                        <option value={1}>$</option>
                        <option value={2}>$$</option>
                        <option value={3}>$$$</option>
                        <option value={4}>$$$$</option>
                        <option value={5}>$$$$$</option>
                    </select>
                </div>
                <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
                >
                Submit
                </button>
            </form>
        </div>
    )
}

export default UpdateShop
