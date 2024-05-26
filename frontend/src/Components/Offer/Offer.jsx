import React from 'react'
import './Offer.css'
import exlusive_offer from '../Assets/exclusive_image.png'

const Offer = () => {
  return (
    <div className='offer'>
        <div className="offer-left">
            <h1>Offer</h1>
            <p>Get 50% off on first order</p>
            <button>Order Now</button>
        </div>
        <div className="offer-right">
            <img src={exlusive_offer} alt="offer" /> 
        </div>
    </div>
  )
}

export default Offer