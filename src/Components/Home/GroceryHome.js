import { useEffect, useState } from "react"
import "./Groceries.css"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { NewCartItem } from "./NewCartItem"


export const Groceries = () => {
    const [groceryItems, setGroceries] = useState([])
    const [filteredGroceries, setFiltered] = useState([])
    const [filteredCartGroceries, setFilteredCart] = useState([])
    const navigate = useNavigate()

    const localGroceryUser = localStorage.getItem("grocery_user")
    const groceryUserObject = JSON.parse(localGroceryUser)

    const fetchGroceryItems = () => {
        return fetch(`http://localhost:8088/groceryItems`)
        .then(response => response.json())
        .then((groceryItemArray) => {
             setGroceries(groceryItemArray)
        })
     }
    
     const deleteGroceryItem = (id) => {
        return fetch(`http://localhost:8088/groceryItems/${id}`, {
             method: "DELETE"
         })
             .then(response => response.json())
             .then(() => {
                 fetchGroceryItems(
 
                 )
             })
         }

            //  const moveItemToCart = (id) => {
            //     // event.preventDefault()
        
            //     return fetch(`http://localhost:8088/groceryItems/${id}`, {
            //         method: "PUT",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify(groceryItem)
            //     })
            //         .then(response => response.json())
            //         .then(() => {
            //             navigate("/")
            //         })
            // }
        //     const moveItemToCart = (event) => {
        //         event.preventDefault()
        
        
        //         const cartItemToSendToAPI = {
        //                 userId: groceryUserObject.id,
        //                 itemName: cartItems.itemName,
        //                 itemPrice: cartItems.itemPrice,
        //                 itemServings: cartItems.itemServings,
        //         }
        //         return fetch(`http://localhost:8088/cartItems`, {
        //             method: "POST",
        //             headers: {
        //                     "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify(groceryItemToSendToAPI)
        //     })
        //             .then(response => response.json())
        //             .then(() => {
        //                     navigate("/")
        //     })
    
        // }

        const addToCart = (id) => {
    
            return fetch(`http://localhost:8088/groceryItems/${id}`, {
                    method: "PATCH",
                    headers: {
                            "Content-Type": "application/json"
                    },
                    body: JSON.stringify({groceryItem: true})
            })
                    .then(response => response.json())
                    .then(() => {
                        fetchGroceryItems()
                        })
    
        }

        const removeFromCart = (id) => {
    
            return fetch(`http://localhost:8088/groceryItems/${id}`, {
                    method: "PATCH",
                    headers: {
                            "Content-Type": "application/json"
                    },
                    body: JSON.stringify({groceryItem: false})
            })
                    .then(response => response.json())
                    .then(() => {
                        fetchGroceryItems()
                        })
    
        }
// PATCH: like "PUT" but only deals w/ 1 field. 
            

    useEffect(
            () => {
                    return fetch(`http://localhost:8088/groceryItems`)
                    .then(response => response.json())
                    .then((groceryItemArray) => {
                         setGroceries(groceryItemArray)
                    })
                 
            },
            [] 
        )
    
        useEffect(
            () => {
             const myGroceries = groceryItems.filter(groceryItems => groceryItems.userId === groceryUserObject.id && groceryItems.groceryItem === false)
                setFiltered(myGroceries)
                
                const myCartGroceries = groceryItems.filter(groceryItems => groceryItems.userId === groceryUserObject.id && groceryItems.groceryItem === true)
                setFilteredCart(myCartGroceries)
             },
                    [groceryItems]
            )
            

            return <>
    
            <article className="grocery_Home">
    
            <input className="servings_Input"/>

            <button className="create_New_Item_Button" onClick={() => navigate("/create")}>Add New Item</button>
           

            <section className="grocery_List">
            <header className="grocery_Header">Grocery List
            </header>
            {
                filteredGroceries.map(
                    (groceryItem) => {
                        return <section className="grocery_Database">
                            <header>
                            <Link to={`/groceryItems/${groceryItem.id}/edit`}>{groceryItem.itemName}</Link>
                            </header>
                            <section>Price: ${groceryItem.itemPrice}</section>
                            <section>Servings Per Container: {groceryItem.itemServings}</section>
                            <footer>
                            <button 
                             onClick={() => deleteGroceryItem(groceryItem.id)}
                                className="delete_Button">
                                Delete
                            </button>
                            <button 
                                onClick={() => addToCart(groceryItem.id)}
                                className="btn btn-primary">
                                ++
                                </button>
                            </footer>
                        </section>
                    }
                )
            }
            </section>
        
            <section className="user_cart">
            <header className="cart_Header">Your Cart
            </header>
            {
                filteredCartGroceries.map(
                    (cartItem) => {
                        return <section className="cart_Database">
                            <header>{cartItem.itemName}</header>
                            <section>Price: ${cartItem.itemPrice}</section>
                            <section>Servings Per Container: {cartItem.itemServings}</section>
                            <footer>
                            <button
                                onClick={() => removeFromCart(cartItem.id)}
                                className="btn btn-primary">
                                --
                            </button>
                            </footer>
                        </section>
                    }
                )
            }
                        <section className="calculation">
                
                            <div className="total"></div>  

                            <div className="calculat_button">
                            <button
                                className="btn btn-primary">
                                Calculate Total
                            </button>
                            </div>
        
                        </section>
                 
            </section>

            </article>
    
        </>
}