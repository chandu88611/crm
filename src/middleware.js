// middleware.js
import { useNavigate } from "react-router-dom"; 

export const bearerMiddleware = () => (next) => (action) => {
   
      const navigate = useNavigate(); 
      const token = localStorage.getItem("clt_token");
      if (!token) {
        navigate("/signin"); 
        return; 
      } else {
        return next(action);
      }

    
  

  
};
