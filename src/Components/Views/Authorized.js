import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("grocery_user")) {
        return children
    }
    else {
        return <Navigate
            to={`/MainContainer/${location.search}`}
            replace
            state={{ location }} />
    }
}