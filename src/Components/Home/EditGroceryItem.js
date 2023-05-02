import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GroceryItemEdit = () => {
    const [groceryItem, assignGroceryItem] = useState({
        itemName: "",
        itemPrice: "",
        itemServings: ""
    })
    const { groceryItemId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/groceryItems/${groceryItemId}`)
            .then(response => response.json())
            .then((data) => {
                assignGroceryItem(data)
            })
    }, [groceryItemId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/groceryItems/${groceryItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groceryItem)
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
                                        assignGroceryItem(copy)
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
                                    assignGroceryItem(copy)
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
                                    assignGroceryItem(copy)
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