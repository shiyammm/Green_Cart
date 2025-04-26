import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";

const ProductCategory = () => {
    const { products } = useAppContext();
    const searchParams = useParams();
    const { category } = searchParams;
    const categoryText = categories.find(
        (item) => item.path.toLowerCase() === category.toLowerCase()
    );
    const filteredCategory = products.filter(
        (product) => product.category.toLowerCase() == category.toLowerCase()
    );

    if (
        !products.some(
            (product) =>
                product.category.toLowerCase() === category.toLowerCase()
        )
    ) {
        return (
            <div className="flex items-center justify-center py-10">
                No products found in this category, "{category}".
            </div>
        );
    }

    return (
        <div className="mt-16 flex flex-col">
            <div className="flex flex-col items-end w-max">
                <p className="text-2xl font-medium uppercase">
                    Fresh {categoryText.text}
                </p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>

            <div className="flex flex-wrap gap-5 mt-6">
                {filteredCategory.length > 0 &&
                    filteredCategory
                        .filter((product) => product.inStock)
                        .map((product, i) => (
                            <ProductCard product={product} key={i} />
                        ))}
            </div>
        </div>
    );
};

export default ProductCategory;
