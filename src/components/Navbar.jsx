import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const {
        user,
        setUser,
        setShowUserLogin,
        navigate,
        searchQuery,
        setSearchQuery
    } = useAppContext();

    const logout = async () => {
        setUser(null);
        navigate("/");
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products");
        }
    }, [searchQuery]);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to={"/"} onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/products"}>All Products</NavLink>
                {user && <NavLink to={"/my-orders"}>My Orders</NavLink>}
                <NavLink to={"/contact"}>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img
                        src={assets.search_icon}
                        alt="Search Icon"
                        className="size-4"
                    />
                </div>

                <div
                    className="relative cursor-pointer"
                    onClick={() => navigate("/cart")}
                >
                    <img src={assets.cart_icon} alt="Cart Icon" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        3
                    </button>
                </div>
                {!user ? (
                    <button
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                        onClick={() => {
                            setShowUserLogin(true);
                        }}
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img
                            src={assets.profile_icon}
                            alt="Profile Icon"
                            className="size-10"
                        />
                        <ul className="hidden group-hover:block absolute bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40 top-10 right-0 ">
                            <li
                                className="pl-3 p-1.5 hover:bg-primary/10 cursor-pointer"
                                onClick={() => navigate("my-orders")}
                            >
                                My Orders
                            </li>
                            <li
                                className="pl-3 p-1.5 hover:bg-primary/10 cursor-pointer"
                                onClick={logout}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <button
                onClick={() => (open ? setOpen(false) : setOpen(true))}
                aria-label="Menu"
                className="sm:hidden"
            >
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="Menu Icon" />
            </button>

            {/* Mobile Menu */}
            <div
                className={`${
                    open ? "flex" : "hidden"
                } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
            >
                <NavLink to={"/"} onClick={() => setOpen(false)}>
                    Home
                </NavLink>
                <NavLink to={"/products"} onClick={() => setOpen(false)}>
                    All Products
                </NavLink>
                {user && (
                    <NavLink to={"/my-orders"} onClick={() => setOpen(false)}>
                        My Orders
                    </NavLink>
                )}
                <NavLink to={"/contact"} onClick={() => setOpen(false)}>
                    Contact
                </NavLink>
                {!user ? (
                    <button
                        className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }}
                    >
                        Login
                    </button>
                ) : (
                    <button
                        className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        onClick={logout}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
