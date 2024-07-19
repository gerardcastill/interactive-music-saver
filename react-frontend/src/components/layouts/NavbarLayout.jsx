import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const NavbarLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default NavbarLayout;