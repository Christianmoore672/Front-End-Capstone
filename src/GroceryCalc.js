import { Route, Routes} from 'react-router-dom';
import './GroceryCalc.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Register } from './Components/Auth/Register';
import { Login } from './Components/Auth/Login';
// import { NavBar } from './Components/Nav/NavBar';
import { ApplicationViews } from './Components/Views/ApplicationViews';
import { Authorized } from './Components/Views/Authorized';

export const Grocery = () => {
  return <Routes>
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register />} />

  <Route path="*" element={
   <Authorized >
      <>
      <div>
        

        <ApplicationViews/>
        </div>
      </>
    </Authorized>
    


  } />
</Routes>
}
