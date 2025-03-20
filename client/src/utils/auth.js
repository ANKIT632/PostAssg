// src/utils/auth.js
import {jwtDecode} from 'jwt-decode';

 const isAuthenticated = () => {

  const token = localStorage.getItem('token');

  if (!token || token===null) {
    
    return false;
  }

else{
 
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    if (decodedToken.exp < currentTime) {
      return false; 
    }
    return true; 
  } catch (error) {
    return false; 
  }
}};

export default isAuthenticated;