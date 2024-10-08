import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => { },
    updateItemQuantity: () => { },
});

const shoppingCartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const updatedItems = [...state.items];
            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === action.payload
            );

            if (existingCartItemIndex >= 0) {
                const updatedItem = {
                    ...updatedItems[existingCartItemIndex],
                    quantity: updatedItems[existingCartItemIndex].quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
                if (product) {
                    updatedItems.push({
                        id: product.id,
                        name: product.title,
                        price: product.price,
                        quantity: 1,
                    });
                }
            }

            return {
                ...state,
                items: updatedItems,
            };
        }
        case 'UPDATE_ITEM': {
            const updatedItems = [...state.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.productId
            );

            if (updatedItemIndex >= 0) {
                const updatedItem = {
                    ...updatedItems[updatedItemIndex],
                    quantity: updatedItems[updatedItemIndex].quantity + action.payload.amount,
                };

                if (updatedItem.quantity <= 0) {
                    updatedItems.splice(updatedItemIndex, 1);
                } else {
                    updatedItems[updatedItemIndex] = updatedItem;
                }
            }

            return {
                ...state,
                items: updatedItems,
            };
        }
        default:
            return state;
    }
};



export default function CartContextProvider({ children }) {

    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        shoppingCartReducer,
        {
            items: [],
        }
    );


    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId,
                amount
            },
        });
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    }

    return <CartContext.Provider value={ctxValue}>
        {children}
    </CartContext.Provider>

}

