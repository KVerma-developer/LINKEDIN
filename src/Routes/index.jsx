import {
    createBrowserRouter
  } from "react-router-dom"; 



  import Login from "../pages/Login";  
import Register from "../pages/Register";
import Home from "../pages/Home";
import HomeLayout from "../Layouts/HomeLayout";
import ProfileLayout from "../Layouts/ProfileLayout";

 
 
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path:"/Register",
      element:<Register/>
    },
    
    {
      path:"/Home",
      element:<HomeLayout/>
    },
    {
      path:"/Profile",
      element:<ProfileLayout/>
    },
    
  ]);