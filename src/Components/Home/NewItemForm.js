import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewItemForm = () => {
    
        const [groceryItem, updateGroceryItem] = useState({
                itemName: "",
                itemPrice: 0.0,
                itemServings: 0
        })

        const navigate = useNavigate()
    

        const localGroceryUser = localStorage.getItem("grocery_user")
        const groceryUserObject = JSON.parse(localGroceryUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        const groceryItemToSendToAPI = {
                userId: groceryUserObject.id,
                itemName: groceryItem.itemName,
                itemPrice: +groceryItem.itemPrice,
                itemServings: +groceryItem.itemServings,
                groceryItem: false,
        }

        // add + to create an int

        return fetch(`http://localhost:8088/groceryItems`, {
                method: "POST",
                headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify(groceryItemToSendToAPI)
        })
                .then(response => response.json())
                .then(() => {
                        navigate("/")
        })

    }

    return (
        <form className="groceryItemForm">
            <h2 className="groceryItemForm__title">New Grocery Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Item Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="ex: Hersheys Chocolate Bar"
                        value={groceryItem.itemName}
                        onChange={
                                (evt) => {
                                        const copy = {...groceryItem}
                                        copy.itemName = evt.target.value
                                        updateGroceryItem(copy)
                                }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Item Price:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="ex: 2.00"
                        value={groceryItem.itemPrice}
                        onChange={
                                (evt) => {
                                    const copy = {...groceryItem}
                                    copy.itemPrice = evt.target.value
                                    updateGroceryItem(copy)
                                }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Servings per Container:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="# of servings per container"
                        value={groceryItem.itemServings}
                        onChange={
                                (evt) => {
                                    const copy = {...groceryItem}
                                    copy.itemServings = evt.target.value
                                    updateGroceryItem(copy)
                                }
                        } />
                </div>
            </fieldset>

            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Item
            </button>
        </form>
    )
}