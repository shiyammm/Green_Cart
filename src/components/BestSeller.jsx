import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
    const { products } = useAppContext();

    return (
        <div className="mt-16">
            <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
            <div className="flex flex-wrap gap-4 mt-6">
                {products
                    .filter((products) => products.inStock)
                    .slice(0, 5)
                    .map((prod, i) => (
                        <ProductCard product={prod} key={i} />
                    ))}
            </div>
        </div>
    );
};

export default BestSeller;
