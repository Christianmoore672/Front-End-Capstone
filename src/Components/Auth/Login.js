import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"
import login1 from '../Images/login1.png'
import { Icon } from 'react-icons-kit'
import logo from '../Images/logo.png'

export const Login = ({container}) => {
//     const [email, set] = useState("")
//     const navigate = useNavigate()

//     const handleLogin = (e) => {
//         e.preventDefault()

//         return fetch(`http://localhost:8088/users?email=${email}`)
//             .then(res => res.json())
//             .then(foundUsers => {
//                 if (foundUsers.length === 1) {
//                     const user = foundUsers[0]
//                     localStorage.setItem("grocery_user", JSON.stringify({
//                         id: user.id,
//                     }))

//                     navigate("/")
//                 }
//                 else {
//                     window.alert("Invalid login")
//                 }
//             })
//     }

//     return (
//         <main className="container--login">
//             <section>
//                 <form className="form--login" onSubmit={handleLogin}>
//                     <h1>Welcome to Grocery Calculator</h1>
//                     <h2>Please sign in</h2>
//                     <fieldset>
//                         <label htmlFor="inputEmail"> Email address </label>
//                         <input type="email"
//                             value={email}
//                             onChange={evt => set(evt.target.value)}
//                             className="form-control"
//                             placeholder="Email address"
//                             required autoFocus />
//                     </fieldset>
//                     <fieldset>
//                         <button type="submit">
//                             Sign in
//                         </button>
//                     </fieldset>
//                 </form>
//             </section>
//             <section className="link--register">
//                 <Link to="/register">Not a member yet?</Link>
//             </section>
//         </main>
//     )
// }
}

export const MainContainer = ({container, changeContainerState}) => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleChangeState = () => {
    changeContainerState();
}

const handleLogin = (e) => {
            e.preventDefault()
    
            return fetch(`http://localhost:8088/users?email=${email}`)
                .then(res => res.json())
                .then(foundUsers => {
                    if (foundUsers.length === 1) {
                        const user = foundUsers[0]
                        localStorage.setItem("grocery_user", JSON.stringify({
                            id: user.id,
                        }))
    
                        navigate("/")
                    }
                    else {
                        window.alert("Invalid login")
                    }
                })
        }

return (
    <main className="main-container">
    <section>
    <div className='main-box'>
    {container === 'initial' && (
        <>
        <div className='leftside'>
        <h1>Welcome to </h1>
        <h1>Grocery Calculator</h1>
           {/* <p>Please sign in</p> */}
             <button onClick={handleChangeState}>SIGN IN</button>
             <button onClick={handleChangeState}>REGISTER</button>
        </div>
        <div className='rightside'>
            <img src={login1} alt=""/>
        </div>
        </>
    )}
    {
        container === 'changed' && (
        <>
           <div className='form-section'>
            <h1>Sign In</h1>
            <form autoComplete='off' onSubmit={handleLogin}>
                <div className='custom-input'>
                    <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                </div>
                <button type="submit" 
                   className='signin-button'
                   onClick={handleChangeState}> 
                   SIGN IN
                </button>
            </form>
           </div>
           <div className='rightside form-section'>
              <h1>Welcome Back!</h1>
              <p></p>
              <div className='img'>
                 <img src={login1} alt=""/>
              </div>
             
           </div>
        </>
        )
    }   

{
        container === 'register' && (
        <>
           <div className='form-section'>
            <h1>Register</h1>
            <form autoComplete='off'>
                <div className='custom-input'>
                    <input placeholder='email:'/>
                </div>
                <button type='button' 
                   className='signin-button'
                   onClick={handleChangeState}> 
                   REGISTER
                </button>
            </form>
           </div>
           <div className='rightside form-section'>
              <h1>Nice To Meet You!</h1>
              <p></p>
              <div className='img'>
                 <img src={login1} alt=""/>
              </div>
             
           </div>
        </>
        )
    }   

    </div>
    </section>
    </main>
)
    }
