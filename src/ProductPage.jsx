import { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";
import { useCart } from "./CartStore";

export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const {addToCart} = useCart();

    useEffect(()=>{
        const fetchProducts = async () => {
            const response = await axios.get("products.json");
            setProducts(response.data);
        }
        fetchProducts();
    },[])

    return <>
        <div className="container my-5">
            <h1 className="text-center mb-4">Our Products</h1>
            <div className="row">
                {
                    products.map( p => (
                        <div key={p.id} className="col-md-4 mb-4">
                            <ProductCard
                                name={p.name}
                                price={p.price}
                                imageUrl={p.imageUrl}
                                onAddToCart={()=>{
                                    addToCart(p);
                                }}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}