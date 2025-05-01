import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
    const { currency, addProduct, removeProductFromCart, navigate, cartItems } =
        useAppContext();
    return (
        product && (
            <div
                className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-64 w-full"
                onClick={() => {
                    navigate(
                        `/products/${product.category.toLowerCase()}/${
                            product._id
                        }`
                    );
                    scrollTo(0, 0);
                }}
            >
                <div className="group cursor-pointer flex items-center justify-center px-2">
                    <img
                        className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                        src={product.image[0]}
                        alt={product.name}
                    />
                </div>
                <div className="text-gray-500/60 text-sm">
                    <p>{product.category}</p>
                    <p className="text-gray-700 font-medium text-lg truncate w-full">
                        {product.name}
                    </p>
                    <div className="flex items-center gap-0.5">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <img
                                    src={
                                        i > 4
                                            ? assets.star_icon
                                            : assets.star_dull_icon
                                    }
                                    key={i}
                                    className="md:w-3.5 w-3"
                                />
                            ))}
                        <p>(4)</p>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                        <p className="md:text-xl text-base font-medium text-primary">
                            {currency} {product.offerPrice}{" "}
                            <span className="text-gray-500/60 md:text-sm text-xs line-through">
                                ${product.price}
                            </span>
                        </p>
                        <div
                            className="text-primary"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {!cartItems[product._id] ? (
                                <button
                                    className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded font-medium cursor-pointer"
                                    onClick={() => addProduct(product._id)}
                                >
                                    <img
                                        src={assets.cart_icon}
                                        alt="Cart Icon"
                                    />
                                    Add
                                </button>
                            ) : (
                                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                    <button
                                        onClick={() =>
                                            removeProductFromCart(product._id)
                                        }
                                        className="cursor-pointer text-md px-2 h-full text-white"
                                    >
                                        -
                                    </button>
                                    <span className="w-5 text-center">
                                        {cartItems[product._id]}
                                    </span>
                                    <button
                                        onClick={() => addProduct(product._id)}
                                        className="cursor-pointer text-md px-2 h-full text-white"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProductCard;
