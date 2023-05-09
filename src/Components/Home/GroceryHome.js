import { useEffect, useState } from "react"
import "./Groceries.css"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { NewCartItem } from "./NewCartItem"
import { NavBar } from "../Nav/NavBar"
import Welcome from "../Images/Welcome.png"
import Two from "../Images/Two.png"
import Three from "../Images/Three.png"
import Four from "../Images/Four.png"
import Five from "../Images/Five.png"



export const Groceries = () => {
    const [groceryItems, setGroceries] = useState([])
    const [filteredGroceries, setFiltered] = useState([])
    const [filteredCartGroceries, setFilteredCart] = useState([])
    const [groceryTotal, setGroceryTotal] = useState(0)
    const [servingInput, setServingInput] = useState(0)
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

    // const displyUser = () => {
    //     return fetch(`http://localhost:8088/users/${fullName}`)
    // }

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
            body: JSON.stringify({ groceryItem: true })
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
            body: JSON.stringify({ groceryItem: false })
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

        const CalculateTotal = (event) => {
            event.preventDefault()
           let total =  0
           let multiplier = 0
           filteredCartGroceries.forEach(item => {
            if (servingInput > item.itemServings){
                multiplier = Math.ceil(servingInput/item.itemServings)
                // Math.ceil Takes whatever is in () & rounds it up to the next whole number
                total += item.itemPrice * multiplier
            }
            else {
                total += item.itemPrice 

            }
           })
           setGroceryTotal(total)


        }

    return <>
        <article className="grocery_Home">
        <div className="home-banner-container">
            <div className="home-bannerImage-container">
                {/* <div> {user.fullName}</div> */}
                <NavBar/>
                <img src={Welcome} alt="" />
            </div>
        </div>

        <div className="input-banner-container">
            <img className="input-image" src={Two} alt="" />
            <input className="servings_Input" 
             placeholder="0"
            onChange={(evt) => {setServingInput(evt.target.value)}}
            />
        </div>

        <div className="newItem-banner-container">
            <img className="newItem-image" src={Three} alt="" />
            <button className="create_New_Item_Button" onClick={() => navigate("/create")}>Add New Item</button>
        </div>


            <section className="grocery-list-container">
            <img className="groceryList-image" src={Four} alt="" />
            
                {
                    filteredGroceries.map(
                        (groceryItem) => {
                            return <section className="grocery-list">
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
            
            <section className="cart-plus-calculation">
            <section className="cart-container">
            <img className="cart-image" src={Five} alt="" />
                {
                    filteredCartGroceries.map(
                        (cartItem) => {
                            return <section className="cart-list">
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
                

            </section>
            <section className="calculation">

                    <div className="total">
                        {groceryTotal}
                    </div>

                    <div className="calculat_button">
                        <button
                            onClick={(event) => {CalculateTotal(event)}}
                            className="btn btn-primary">
                            Calculate Total
                        </button>
                    </div>

                </section>
                </section>
        </article>

    </>
}


// create a state variable for desired servings just like the cart total
// in the forEach loop of the calculate total function multiply item