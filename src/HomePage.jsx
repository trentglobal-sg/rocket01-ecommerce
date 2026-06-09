import ProductCard from "./ProductCard"

export default function HomePage() {
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
                <div className="col-md-3 mb-4">
                    <ProductCard
                        productName="Product 1"
                        price={22.99}
                        imageUrl="https://picsum.photos/id/8/200/300"

                    />
                </div>
                <div className="col-md-3 mb-4">
                    <ProductCard
                        productName="Product 2"
                        price={33.99}
                        imageUrl="https://picsum.photos/id/144/200/300"
                    />
                </div>
                <div className="col-md-3 mb-4">
                    <ProductCard
                        productName="Product 3"
                        price={133.99}
                        imageUrl="https://picsum.photos/id/11/200/300"

                    />
                </div>
                <div className="col-md-3 mb-4">
                    <ProductCard
                        productName="Product 4"
                        price={533.99}
                        imageUrl="https://picsum.photos/id/12/200/300"

                    />
                </div>
            </div>
        </main>
    </>
}