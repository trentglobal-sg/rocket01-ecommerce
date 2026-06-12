import { atom, useAtom } from 'jotai';
import { useJwt} from './UserStore';
import { useEffect, useRef} from 'react';
import axios from 'axios';

const initialCart = [

]

export const cartAtom = atom(initialCart);

// create the hook
export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);

    const { getJwt } = useJwt();

    // fetch the content of the user's shopping cart
    const fetchCart = async () => {
        const jwt = getJwt();
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/api/cart", {
                headers: {
                    Authorization:"Bearer " + jwt
                }
            })
            setCart(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    const updateCart = async (updatedCart) => {
        const jwt = getJwt();
        try {
            const updatedCartItems = updatedCart.map(item =>({
                product_id: item.product_id,
                quantity: item.quantity
            }))

            // call the PUT /api/cart to update the cart
            await axios.put(import.meta.env.VITE_API_URL + "/api/cart", {cart_items:updatedCartItems}, {
                headers: {
                    Authorization: "Bearer " + jwt
                }
            })

        } catch (e) {
            console.error(e);
        }
    }

    const getCartTotal = () => {
        let total = 0;
        for (let cartItem of cart) {
            total += cartItem.price * cartItem.quantity;
        }
        return total.toFixed(2);
    }

    const addToCart = (product) => {

        // if the product is already in the shopping cart
        // just increase the quantity by 1

        // find if the product already exists
        const productIndex = cart.findIndex(cartItem => cartItem.product_id === product.id)

        if (productIndex === -1) {
            // product is not in the shopping cart, so add to it
            const newCartItem = {
                id: Math.floor(Math.random() * 10000 + 1),
                product_id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                description: product.description,
                quantity: 1
            }
            const cloned = [...cart, newCartItem];
            setCart(cloned);
            updateCart(cloned);
        } else {
            const existingCartItem = cart[productIndex];
            const cloned = {...existingCartItem, quantity: existingCartItem.quantity + 1};

            const clonedCart = cart.with(productIndex, cloned);
            setCart(clonedCart);
            updateCart(clonedCart);
        }


    }

    const removeFromCart = (productId) => {
        const indexToRemove = cart.findIndex(p => p.id === productId);
        const cloned = cart.toSpliced(indexToRemove, 1);
        setCart(cloned);
        updateCart(cloned);

    }

    const updateQuantity = (productId, newQuantity) => {
        const cartItemIndex = cart.findIndex( cartItem => cartItem.product_id === productId);

        const clonedCartItem = {...cart[cartItemIndex], quantity: newQuantity};

        const clonedCart = cart.with(cartItemIndex, clonedCartItem);

        setCart(clonedCart);
        updateCart(clonedCart);
    }

    return { cart, getCartTotal, addToCart, removeFromCart, updateQuantity, fetchCart }
}