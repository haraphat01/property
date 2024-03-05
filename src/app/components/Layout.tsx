"use client"
import Footer from "./Footer"
import Navigate from "../components/Navigation"
const Layout = ({ children }) => {
    return (
      <div>
        <Navigate/>
        {children}

        <Footer className="min-h-50" /> {/* Apply Tailwind CSS classes here */}
      </div>
    );
  };
  
  export default Layout;