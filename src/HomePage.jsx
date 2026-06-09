import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {

    const [proudcts, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get("featured.json");
            setProducts(response.data);
        }
        fetchProducts();
    }, [])

    return <>
        <header className="bg-primary text-white text-center py-5">
            <div className="container">
                <h1 className="display-4">Welcome to E-Shop</h1>
                <p className="lead">Discover amazing products at unbeatable prices!</p>
                <a href="#" className="btn btn-light btn-lg">Shop Now</a>
            </div>
        </header>
        <main className="container my-5">
            <h2 className="text-center mb-4">Featured Products</h2>
            <div className="row">
                {
                    proudcts.map(p => (
                        <div className="col-md-3 mb-4" key={p.id}>
                            <ProductCard
                                productName={p.name}
                                price={p.price}
                                imageUrl={p.imageUrl}

                            />
                        </div>
                    ))
                }




            </div>
        </main>
    </>
}