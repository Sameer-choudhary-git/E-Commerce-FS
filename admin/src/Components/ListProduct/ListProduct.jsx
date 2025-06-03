import React, { useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const ListProduct = () => {
  const [neededCategory, setNeededCategory] = useState('test');
  const [allproduct, setAllProduct] = useState([]);

  const handleChange = (e) => {
    if(e.target.value === 'test') return;
    const value = e.target.value;
    setNeededCategory(value);
    console.log(value);
    fetchProduct(value);
  };

  const fetchProduct = async (value) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/allProduct?category=${value}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if(data.length === 0) {
        setAllProduct([]);
        return;
      }
      setAllProduct(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeProduct = async (product) => {
    try {
      await fetch(`${BACKEND_URL}/api/removeProduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: product.id}),
      });
      
      fetchProduct(neededCategory);
      
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div className='listproduct'>
      <h1>List Product</h1>
      <select
        name='category'
        className='listproduct-selector'
        value={neededCategory}
        onChange={handleChange}
      >
        <option value="test" >select category</option>
        <option value='women'>Women</option>
        <option value='men'>Men</option>
        <option value='kid'>Kid</option>
      </select>
      <div className='listproduct-format-main'>
        <p>Id</p>
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {  allproduct.map((product,index)=>{
          return <> <div key={index} className="listproduct-format-main listproduct-format">
              <p>{product.id}</p>
              <img className='listproduct-product-icon' src={product.image} alt="image" />
              <p>{product.name}</p>
              <p>${product.new_price}</p>
              <p>${product.old_price}</p>
              <p>{product.category}</p>
              <img src={cross_icon} onClick={()=>removeProduct(product)} className='listproduct-remove-icon'  />
          </div>
          <hr /></>
        })}
      </div>
    </div>
  );
};

export default ListProduct;
