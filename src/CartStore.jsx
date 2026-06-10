import { atom, useAtom } from 'jotai';

const initialCart = [

]

export const cartAtom = atom(initialCart);

// create the hook
export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);

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
        } else {
            const existingCartItem = cart[productIndex];
            const cloned = {...existingCartItem, quantity: existingCartItem.quantity + 1};

            const clonedCart = cart.with(productIndex, cloned);
            setCart(clonedCart);

        }


    }

    return { cart, getCartTotal, addToCart }
}