import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menu, setmenu] = useState("shop");

  return (
    <div className='navbar'>
        <div className="logo">
            <img src={logo} alt='logo' />
        </div>
        <div className="nav-menu">
            <ul>
                <li onClick={()=>{setmenu("shop")}}> <Link to="/" style={{textDecoration:"none"}}>Home</Link>  {menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("mens")}}> <Link to="/mens" style={{textDecoration:"none"}}>Mens</Link> {menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("womens")}}><Link to="/womens" style={{textDecoration:"none"}}>Womens </Link>{menu==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("kids")}}> <Link to="/kids" style={{textDecoration:"none"}}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
        </div>
        <div className="cart-login">
            <Link to="/cart" style={{textDecoration:"none"}}><img src={cart} alt="cart" /></Link>
            <Link to='/login' style={{textDecoration:"none"}}><button>Login</button></Link>
        </div>
    </div>
  )
}

export default Navbar