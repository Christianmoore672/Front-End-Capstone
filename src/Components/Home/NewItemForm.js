import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
        <Form className="groceryItemForm">
            <h2 className="groceryItemForm__title">New Grocery Item</h2>
            <Form.Group>
                <div className="form-group">
                <Form.Label htmlFor="description">Item Name:</Form.Label>
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
            </Form.Group>
            <Form.Group>
                <div className="form-group">
                <Form.Label htmlFor="description">Item Price:</Form.Label>
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
            </Form.Group>
            <Form.Group>
                <div className="form-group">
                    <Form.Label htmlFor="description">Servings per Container:</Form.Label>
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
             </Form.Group>

            <Button 
                variant="primary" type="submit"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Item
            </Button>
            </Form>
    )
}


    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

