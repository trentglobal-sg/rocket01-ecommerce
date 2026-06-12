import axios from "axios";
import { useCart } from "./CartStore";
import { useEffect } from "react";
import { useJwt } from "./UserStore";

export default function ShoppingCartPage() {

    const { cart, getCartTotal, removeFromCart, updateQuantity, fetchCart } = useCart();
    const { getJwt } = useJwt();

    useEffect(() => {
        fetchCart();
    }, []);

    return <>
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            <ul className="list-group">
                {
                    cart.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                            <div>
                                <h5>{item.name}</h5>
                                <img src={item.imageUrl} />


                            </div>

                            <div>
                                <button className="btn btn-success btn-sm m-2"
                                    onClick={() => {
                                        updateQuantity(item.product_id, item.quantity - 1)
                                    }}
                                    disabled={item.quantity == 1}

                                >-</button>
                                <span className="m-2">Quantity: {item.quantity}</span>
                                <button className="btn btn-success btn-sm m-2" onClick={() => {
                                    updateQuantity(item.product_id, item.quantity + 1)
                                }}>+</button>
                            </div>

                            <div>
                                <div>${(item.price * item.quantity).toFixed(2)}</div>
                                <button className="btn btn-danger"
                                    onClick={() => {
                                        removeFromCart(item.product_id)
                                    }}
                                >Remove</button>
                            </div>
                        </li>

                    ))
                }
            </ul>
            <div className="mt-3 mb-3 text-end">
                <h4>Total: ${getCartTotal()}</h4>
            </div>
            <button className="btn btn-primary btn-lg mb-3" onClick={async () => {
                const jwt = getJwt();
                const response = await axios.post(import.meta.env.VITE_API_URL + "/api/checkout", {}, {
                    headers: {
                        Authorization: "Bearer " + jwt
                    }
                })
                window.location = response.data.session.url;
            }}>Checkout</button>
        </div>




    </>
}