import { Route, Routes} from 'react-router-dom';
import './GroceryCalc.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Register } from './Components/Auth/Register';
import { Login, MainContainer } from './Components/Auth/Login';
// import { NavBar } from './Components/Nav/NavBar';
import { ApplicationViews } from './Components/Views/ApplicationViews';
import { Authorized } from './Components/Views/Authorized';
import { useState } from 'react';

export const Grocery = () => {
  const [container, setContainer] = useState('initial');

  const changeContainerState = () => {
    if(container === 'initial'){
      setContainer('changed');
    }
    else if(container !== 'initial'){
      setContainer('inintial');
    }
  }

  {
    if(container === 'initial'){
      setContainer('register');
    }
    else if(container !== 'initial'){
      setContainer('inintial');
    }
  }

  
  return <Routes>
  <Route path='/MainContainer' element={<MainContainer container = {container}
  changeContainerState = {changeContainerState}
  />} />
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
