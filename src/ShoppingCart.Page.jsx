import { useCart } from "./CartStore";

export default function ShoppingCartPage() {

    const {cart, getCartTotal} = useCart();

    return <>
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            <ul className="list-group-item">
            {
                cart.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                        <div>
                            <h5>{item.name}</h5>
                            <img src={item.imageUrl}/>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <span>${item.price * item.quantity}</span>
                    </li>
                    
                ))
            }
            </ul>
            <div className="mt-3 mb-3 text-end">
                <h4>Total: ${getCartTotal()}</h4>
            </div>
        </div>

    </>
}