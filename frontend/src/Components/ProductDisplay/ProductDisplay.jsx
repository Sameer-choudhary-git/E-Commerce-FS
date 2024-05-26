import React from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";

const ProductDisplay = (props) => {
    const {Product} = props;
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={Product.image}  />
                <img src={Product.image}  />
                <img src={Product.image}  />
                <img src={Product.image}  />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={Product.image}  />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{Product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon}/>
                <img src={star_icon}/>
                <img src={star_icon}/>
                <img src={star_icon}/>
                <img src={star_dull_icon}/>
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${Product.old_price}</div>
                <div className="productdisplay-right-price-new">${Product.new_prices}</div>
            </div>
            <div className="productdisplay-right-description">
                THIS THE HELL IS SO CALLED DISCRPTION.
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                </div>
            </div>
            <button>Add to Cart</button>
            <p className='productdisplay-right-category'><span>Category :</span>{Product.category}</p>
            <p className='productdisplay-right-category'><span>Tags :</span>{Product.category}</p>
        </div>
    </div>
  )
}

export default ProductDisplay