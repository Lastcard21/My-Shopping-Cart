import { createContext, useState, useContext} from "react";
import { allProducts } from "../assets/data/index.js";
import { getItemFromStorage, getParsedItemFromStorage, setItemInStorage } from "../utilities/localStorageFns.jsx";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [allItems, setAllItems] = useState([]);

    function setItems() {
        setAllItems(allProducts)
    }

    function addToCart(item) {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                if (prevItem.inCart) {
                    return prevItem
                }
                return prevItem.id === item.id ? {...prevItem, inCart: true} : prevItem
            })
        })
    }

    function removeFromCart(item) {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                return prevItem.id === item.id ? {...prevItem, inCart: false, quantity: 1} : prevItem
            })
        })
    }
    
    function updateQuantity(cartItem, amount) {
        setAllItems((prevItems) => {
            return prevItems.map((item) => {
                return item.id == cartItem.id ? {...item, quantity: item.quantity + amount} : item;
            })
        })
    }

    
    function setLocalStorage() {
        if(allItems.length !== 0) {
            const inCartItems = allItems.filter((item) => item.inCart)
            setItemInStorage("cartItems", inCartItems)
        }
    }

    function setCartItems() {
        if(getItemFromStorage("cartItems" !== null )) {
            const storageItems = getParsedItemFromStorage("cartItems")
            setAllItems((prevItems) => {
                return prevItems.map((item) => {
                    const matchedItem = storageItems.find((storageItem) => storageItem.id === item.id)
                    return matchedItem ? matchedItem : item
                })
            })
        }
    }
    return (
        <CartContext.Provider value={{ allItems, setItems, addToCart, removeFromCart, updateQuantity, setLocalStorage, setCartItems }}>
            {children}
        </CartContext.Provider>
    )
}

 export function useCart() {
    return useContext(CartContext)
}