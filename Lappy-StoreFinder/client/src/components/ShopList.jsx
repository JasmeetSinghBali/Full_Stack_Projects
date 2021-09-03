import React from 'react'

const ShopList = () => {
    return (
        <div className="list-group">
            <table className="table table-hover table-info">
                <thead>
                    <tr className="bg-primar">
                        <th scope="col">Shop</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
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
                    </tr>
                    <tr>
                        <td>Something1</td>
                        <td>Somewhere</td>
                        <td>$$</td>
                        <td>Ratings</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ShopList
