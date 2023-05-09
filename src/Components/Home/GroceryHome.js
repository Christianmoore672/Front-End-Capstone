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

    const [user, setUser] = useState([])
    const [filteredUser, setFilteredUser] = useState([])

    const localGroceryUser = localStorage.getItem("grocery_user")
    const groceryUserObject = JSON.parse(localGroceryUser)

    const fetchData = () => {
        return fetch("http://localhost:8088/users")
              .then((response) => response.json())
              .then((data) => setUser(data));
      }
      useEffect(() => {
        fetchData();
      },[])


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
                <NavBar/>
                <label className="user-print">
                  {user && user.length > 0 && user.map((groceryUserObject) => (
                  <div key={groceryUserObject.id}>{groceryUserObject.fullName}</div>
                   ))}
               </label>
                <img src={Welcome} alt="" />
            </div>
        </div>

        <div className="newItem-banner-container">
            <img className="newItem-image" src={Three} alt="" />
            <button className="create_New_Item_Button" onClick={() => navigate("/create")}>Add New Item</button>
        </div>

        <div className="input-banner-container">
            <img className="input-image" src={Two} alt="" />
            <input className="servings_Input" 
             placeholder="0"
            onChange={(evt) => {setServingInput(evt.target.value)}}
            />
        </div>
        
            <section className="grocery-list-container">
            <img className="groceryList-image" src={Four} alt="" />
            <div className="grocery-list"> 
            
                {
                    filteredGroceries.map(
                        (groceryItem) => {
                            return <section className="grocery-item">
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
                                        className="add-to-cart-button">
                                        Add To Cart
                                    </button>
                                </footer>
                            </section>
                        }
                    )
                }
                </div>
            </section>
            
            <section className="cart-plus-calculation">
            <section className="cart-container">
            <img className="cart-image" src={Five} alt="" />
            <div className="cart-list"> 
                {
                    filteredCartGroceries.map(
                        (cartItem) => {
                            return <section className="cart-item">
                                <header>{cartItem.itemName}</header>
                                <section>Price: ${cartItem.itemPrice}</section>
                                <section>Servings Per Container: {cartItem.itemServings}</section>
                                <footer>
                                    <button
                                        onClick={() => removeFromCart(cartItem.id)}
                                        className="remove-from-cart-button">
                                        Remove From Cart
                                    </button>
                                </footer>
                            </section>
                        }
                    )
                }
            </div>

            </section>
            <section className="calculation-container">

                    <div className="total">
                        {groceryTotal}
                    </div>

                    <div className="calculation">
                        <button
                            onClick={(event) => {CalculateTotal(event)}}
                            className="calculate-button">
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