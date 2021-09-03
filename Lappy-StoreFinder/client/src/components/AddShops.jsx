import React from 'react'

const AddShops = () => {
    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="name" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="location"/>
                    </div>
                    <div className="col">
                        <select className="custom-select my-1 mr-sm-2">
                            <option disabled>Price Range</option>
                            <option value="20000">$</option>
                            <option value="40000">$$</option>
                            <option value="60000">$$$</option>
                            <option value="80000">$$$$</option>
                            <option value="100000">$$$$$</option>
                        </select>
                    </div>
                    <button 
                    className="btn btn-primary">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddShops
