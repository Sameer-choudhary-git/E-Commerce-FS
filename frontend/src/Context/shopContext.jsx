import React, {createContext, useState} from "react";
// import all_product from "../Components/Assets/all_product"
import { useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const token = localStorage.getItem('token');
    const [cartItems, setcartItems] = useState([]);

   
    useEffect(() => {
        fetch("http://localhost:8080/api/allProduct_allCategory")
        .then((res)=>res.json())
        .then((data)=>setAll_Product(data))
        .catch((err)=>console.log(err));

        getCartItems(); 
    }, []); 
    
   
    
    
    const addToCart = (itemid) => {
        if (token) {
            fetch("http://localhost:8080/api/addToCart",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/form-data",
                    'token':token,
                },
                body:JSON.stringify({itemid:itemid})
            }).then((res)=>res.json())
            .then((data)=>{alert("Added into Cart");console.log(data)})
        }
    };
    
   


    
    const getCartItems = () => {
        if (token) {
            fetch("http://localhost:8080/api/getCartItems",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/form-data",
                    'token':token,
                },
            }).then((res)=>res.json())
            .then((data)=>{setcartItems(data);console.log(cartItems)})
        }
    }
    
    const getTotalCartAmount = () => {  
        let totalAmount=0;
        for (const item in cartItems) {
            totalAmount += cartItems[item].new_price*cartItems[item].quantity;
            
        }
        return totalAmount;
    };

    const contextValue = {all_product,cartItems,addToCart,getTotalCartAmount,token};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;  