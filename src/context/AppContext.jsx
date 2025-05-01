import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch the products
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    };

    // Add Products to Cart
    const addProduct = async (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart");
    };

    // Updated Cart Item quantity
    const updatedCartItem = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    };

    // Remove Product from Cart
    const removeProductFromCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart");
        setCartItems(cartData);
    };

    // Gwt cart item count
    const getCartCount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            return total + cartItems[itemId];
        }, 0);
    };

    // Get cart total amount
    const getCartAmount = () => {
        const totalAmount = Object.keys(cartItems).reduce((total, itemId) => {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo && cartItems[itemId] > 0) {
                return total + itemInfo.offerPrice * cartItems[itemId];
            }
            return total;
        }, 0);

        return Number(totalAmount.toFixed(2));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {
        user,
        setUser,
        isSeller,
        setIsSeller,
        navigate,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        cartItems,
        setCartItems,
        addProduct,
        updatedCartItem,
        removeProductFromCart,
        searchQuery,
        setSearchQuery,
        getCartAmount,
        getCartCount
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
