import { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";
import { useCart } from "./CartStore";
import { useFlashMessage } from "./FlashMessageStore";

export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const {addToCart} = useCart();
    const {showMessage} = useFlashMessage();

    useEffect(()=>{
        const fetchProducts = async () => {
            const response = await axios.get(import.meta.env.VITE_API_URL+"/api/products");
            setProducts(response.data.products);
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
                                    showMessage(`${p.name} has been added to the shopping cart`)
                                    
                                }}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}