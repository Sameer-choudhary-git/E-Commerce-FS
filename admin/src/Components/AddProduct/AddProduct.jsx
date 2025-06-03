import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const AddProduct = () => {
    
    


    const [productDetails, setProductDetails] = useState({
        id: '',
        name: '',
        old_price: '',
        new_price: '',
        description: "This is a product description.(just for testing)",
        category: 'women',
        quantity: 1,
        image: null
    });
    
    const imageHandler = (e) => {
        setProductDetails({ ...productDetails, image: e.target.files[0] });
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let responsedata = null;
        let backup_product = productDetails;
        let formdata = new FormData();
        formdata.append('product', productDetails.image);

        await fetch(`${BACKEND_URL}/upload`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formdata
        }).then(response => response.json()).then(data => {
                responsedata = data;
            })
            .catch(err => console.log(err));
        
        if(responsedata.success){
            productDetails.image = responsedata.image_url;
        } else {
            console.log("error in uploading image");
            return;
        }
            
        await fetch(`${BACKEND_URL}/api/addProduct`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },   
            body: JSON.stringify(productDetails)
        }).then(response => response.json()).then(data => {
            console.log('Product details:', data);
            alert('Product added successfully');
            window.location.reload('/addProduct');
        }).catch(err => console.log(err));


    };

    return (
        <div className='addproduct'>
            <form onSubmit={handleSubmit}>
                <div className="addproduct-itemfield">
                    <p>Product title</p>
                    <input
                        value={productDetails.name}
                        onChange={handleChange}
                        type="text"
                        name='name'
                        placeholder='type here'
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Id</p>
                    <input
                        value={productDetails.id}
                        onChange={handleChange}
                        type="text"
                        name='id'
                        placeholder='type here'
                    />
                </div>
                <div className="addproduct-price">
                    <div className="addproduct-itemfield">
                        <p>Price</p>
                        <input
                            value={productDetails.old_price}
                            onChange={handleChange}
                            type="text"
                            name='old_price'
                            placeholder='type here'
                        />
                    </div>
                    <div className="addproduct-itemfield">
                        <p>Offer Price</p>
                        <input
                            value={productDetails.new_price}
                            onChange={handleChange}
                            type="text"
                            name='new_price'
                            placeholder='type here'
                        />
                    </div>
                    <div className="addproduct-itemfield">
                        <p>Qantity</p>
                        <input
                            value={productDetails.quantity}
                            onChange={handleChange}
                            type="text"
                            name='quantity'
                            placeholder='type here'
                        />
                    </div>
                </div>
                <div className="addproduct-itemfield">
                    <p>Product Category</p>
                    <select
                        name="category"
                        className='addproduct-selector'
                        value={productDetails.category}
                        onChange={handleChange}
                    >
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kid">Kid</option>
                    </select>
                </div>
                <div className="addproduct-itemfield">
                    <label htmlFor="file-input">
                        <img
                            src={productDetails.image ? URL.createObjectURL(productDetails.image) : upload_area}
                            className='addproduct-thumbnail-img'
                            alt="Product thumbnail"
                        />
                    </label>
                    <input
                        type="file"
                        onChange={imageHandler}
                        name='image'
                        id="file-input"
                        hidden
                    />
                </div>
                <button type='submit' className='addproduct-btn'>Add</button>
            </form>
        </div>
    );
}

export default AddProduct;
