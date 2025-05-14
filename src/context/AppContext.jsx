import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

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
        try {
            const { data } = await axios.get("/api/products/list");
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // fetch seller status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    };

    // fetch seller status
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");
            if (data.success) {
                setUser(true);
                setCartItems(data.user.cartItems);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            setUser(null);
        }
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
        fetchSeller();
        fetchUser();
    }, []);

    // Update Cart
    const updateCart = async () => {
        try {
            const { data } = await axios.post("/api/cart/update", {
                cartItems
            });
            if (!data.success) {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            updateCart();
        }
    }, [cartItems]);

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
        getCartCount,
        axios,
        fetchProducts
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
