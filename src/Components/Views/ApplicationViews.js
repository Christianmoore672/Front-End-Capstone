import { Route, Routes, Outlet } from "react-router-dom"
import { Groceries } from "../Home/GroceryHome"
import { NewItemForm } from "../Home/NewItemForm"
import { GroceryItemEdit } from "../Home/EditGroceryItem"
// import { NavBar } from "../Nav/NavBar"
import "./ApplicationViews.css"


export const ApplicationViews = () => {
	return ( 
	<Routes>
<Route path="/" element={
	
<>
	{/* <h2> Welcome to your Grocery Calculator</h2> */}
	{/* <div>Please begin by entering your desired servings</div> */}
	<Outlet />
	</>
	}>

	<Route path="/" element={ <Groceries /> } />
    <Route path="/create" element={ <NewItemForm /> } />
    <Route path="groceryItems/:groceryItemId/edit" element={ <GroceryItemEdit /> } />
</Route>
	</Routes>
	
	)
}