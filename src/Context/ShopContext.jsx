import React, { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product";
import axios from 'axios'



export const ShopContext =  createContext(null);

const getDefaultCart = (allProduct)=>{
    let cart = {};
    for (let index = 0; index < allProduct.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems,setCartItems] = useState();
    const [allProduct,setAllProduct] = useState();
    
    useEffect(()=>{
        const fetchData = async() =>{
            try {
            const res = await axios.get('http://localhost:4000/allproducts');
            setAllProduct(res.data); 
            setCartItems(getDefaultCart(res.data))
            } catch (error) {
               console.error(error); 
            }
        }
        fetchData();
    },[])

    console.log(cartItems);

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems);
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = allProduct.find((product) => product.id === Number(item));
            totalAmount += cartItems[item] * itemInfo.new_price;
          }
        }
        return totalAmount;
      }

      const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
      }

    const contextValue = {getTotalCartItems,getTotalCartAmount,allProduct,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;