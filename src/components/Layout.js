import { Outlet, Link } from "react-router-dom";
import '../style/layout/layout.style.css';

const Layout = () => {
    return (
      <>
      
        <Outlet />
        
        <footer>
        <hr />
            <p>Scandiweb Test assigment</p>
        </footer>
      </>
    )
  };
  
  export default Layout;