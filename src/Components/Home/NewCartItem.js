import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

    // const [cartItems, setCartItems] = useState([])
    // const [filteredCartItems, setFilteredCartItems] = useState([])
    // // const [cartItem, moveCartItem] = useState([])

export const NewCartItem = (groceryState, grocerySetter) => {
    
    // const [groceryItems, setGroceries] = useState([])
    const [filteredGroceries, setFiltered] = useState([])


        const [cartItem, setCartItem] = useState({
                itemName: "",
                itemPrice: "",
                itemServings: ""
        })

        const navigate = useNavigate()
    

        const localGroceryUser = localStorage.getItem("grocery_user")
        const groceryUserObject = JSON.parse(localGroceryUser)

// Fetch Grocery Items
useEffect(
    () => {
                const filteredGroceries = groceryState.filter(item => { 
                    console.log(item.groceryItem)
                    return item.groceryItem === true})
                    setFiltered(filteredGroceries)
    },
    [] 
)

useEffect(
    () => {
     const myGroceries = groceryState.filter(groceryItems => groceryItems.userId === groceryUserObject.id)
        setFiltered(myGroceries)
        
     },
            [groceryState]
    )

// Print Grocery Items where item.groceryItem === false
// Create patch on GroceryHome.js
// Call patch on button click on GroceryHome.js

    return <>
    
            <article className="grocery_Home">
            
            <section className="user_cart">
            <header className="cart_Header">Your Cart
            </header>
            {
                filteredGroceries.map(
                    (cartItem) => {
                        return <section className="cart_Database">
                            <header>{cartItem.itemName}</header>
                            <section>Price: ${cartItem.itemPrice}</section>
                            <section>Servings Per Container: {cartItem.itemServings}</section>
                            <footer>
                            <button
                                className="btn btn-primary">
                                --
                            </button>
                            </footer>
                        </section>
                    }
                )
            }
            </section>
            </article>
    
        </>
}