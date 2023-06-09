import { useNavigate } from "react-router-dom"
import { useEffect, useState, navigate } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import Logo from "../Images/logo.png"
import { BsCart2 } from "react-icons/bs"
import { HiOutlineBars3 } from "react-icons/hi2"
// import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
// import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
// import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar = () => {
  // const navigate = useNavigate()

  // return 
  // (
//       <article className="navbar">
//           <div className="navbar__item active">
//               <Link className="navbar__link" to="/tickets">Saved Carts</Link>
//           </div>
//           <div className="navbar__item navbar__logout">
//               <Link className="navbar__link" to="/profile">Profile</Link>
//           </div>
//           {
//               localStorage.getItem("grocery_user")
//                   ? <div className="navbar__item navbar__logout">
//                       <Link className="navbar__link" to="" onClick={() => {
//                           localStorage.removeItem("grocery_user")
//                           navigate("/", {replace: true})
//                       }}>Logout</Link>
//                   </div>
//                   : ""
//           }
//       </article>
//   )
// }
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false)
    const menuOtions = [
      {
        text: "Home",
        // icon: <HomeIcon/>
      },
      {
        text: "Profile",
        // icon: <InfoIcon/>
      },
      {
        text: "Saved Carts",
        // icon: <ShoppingCartRoundedIcon/>
      }, 
      {
        text: "LogOut"
      },
    ];

    return (
      <nav>
        <div className="nav-logo-container">
          {/* <img src={Logo} alt="" /> */}
        </div>
        <div className="navbar-links-container">
          <a href="">Home</a>
          <a href="">Saved Carts</a>
          <a href="">Profile</a>
          <a onClick={() => {
                           localStorage.removeItem("grocery_user")
                           navigate("/", {replace: true})
                     }}>Logout</a>
        </div>
      </nav>
    );
  };

//   return (
//     <Navbar bg="light" expand="lg">
//         <a className="logo" href="#"></a>
//       <Container>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Nav className="navbar_link">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Profile</Nav.Link>
//             <Nav.Link href="#link">Saved Carts</Nav.Link>
//             <Nav.Link className="navbar_link" to="" onClick={() => {
//                             localStorage.removeItem("grocery_user")
//                             navigate("/", {replace: true})
//                         }}>Logout</Nav.Link>
//           </Nav>

//       </Container>
//     </Navbar>
//   );
// }
