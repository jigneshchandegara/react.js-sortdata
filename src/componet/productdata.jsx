import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Productdata = () => {

    let productname = useRef();
    let price = useRef();
    let description = useRef();

    const [data, setdata] = useState([]);
    const [sortdata, setsortdata] = useState('price');

    // post(adddata) from server
    const postproduct = async (e) => {
        e.preventDefault();
        let productobj = {
            productname: productname.current.value,
            price: price.current.value,
            description: description.current.value
        };
        let rse = await axios.post("http://localhost:3003/product", productobj);
        productname.current.value = "";
        price.current.value = "";
        description.current.value = "";
        console.log(rse.data, "find");
        setdata([...data, rse.data]);
    }

    //get  data from server
    const getproduct = async () => {
        let result = await axios.get("http://localhost:3003/product");
        setdata(result.data)
        console.log(result.data);

    }

    useEffect(() => {
        getproduct();
    }, [])

    // Sorting products 
    const sortedProducts = [...data].sort((a, b) => {
        if (sortdata === 'price') {
            return a.price - b.price;
        }
    });

    const sortProductsdata = sortedProducts.filter(product => product.price.toString());

    return (
        <>
            <div className="d-flex justify-content-evenly">
                <form>
                    <div class="m-2 border" style={{ width: "18rem" }}>
                        <h4>Product Data</h4>
                        <label class="form-label">product</label>
                        <input type="text" class="form-control" name="productname" ref={productname} />
                        <label class="form-label">price</label>
                        <input type="number" class="form-control" name="price" ref={price} />
                        <label class="form-label">description</label>
                        <input type="text" class="form-control" name="description" ref={description} />
                        <input type="submit" name="submit" class="btn btn-primary" onClick={postproduct} />
                    </div>
                </form>
            </div>
            <table cellpadding="10px" className="col-12 text-center table-bordered  border-secondary">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>product name</th>
                        <th>Price(Rs.)</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        sortProductsdata.map((value, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{index}</td>
                                        <td>{value.productname}</td>
                                        <td>{value.price}</td>
                                        <td>{value.description}</td>
                                    </tr>
                                </>
                            )
                        })
                    }

                </tbody>
            </table>

        </>
    )

}
export default Productdata;