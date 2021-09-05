import React, { useContext, useState } from 'react';
import ShopFinder from '../api/ShopFinder';
import { ShopsContext } from '../context/ShopsContext';

const AddShops = () => {

    const {addShops} = useContext(ShopsContext);
    const [ name,setName ] = useState("");
    const [ location,setLocation ] = useState("");
    const [ contact,setContact ] = useState();
    const [ priceRange,setPriceRange ] = useState("Price Range");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const resp = await ShopFinder.post("/",{
                name: name,
                location: location,
                contact: contact,
                price_range: priceRange
            });
            
            // to update the shop list with recently added shop
            addShops(resp.data.data.newStore);

        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="name" />
                    </div>
                    <div className="col">
                        <input type="text" value={location}  onChange={(e) => setLocation(e.target.value)} className="form-control" placeholder="location"/>
                    </div>
                    <div className="col">
                        <input value={contact} onChange={(e) => setContact(e.target.value)} type="number" className="form-control" placeholder="contact" />
                    </div>
                    <div className="col">
                        <select  value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
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
                    className="btn btn-primary">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddShops
