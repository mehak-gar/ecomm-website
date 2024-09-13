import {createSlice} from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        let cart = window.localStorage?.getItem('cart');
        if (cart) {
            return JSON?.parse(cart);
        } else {
            return [];
        }
    } else {
        return [];
    }
}

const storeInLocalStorage = (data:any) => {
    window.localStorage.setItem('cart', JSON.stringify(data));
}

const initialState = {
    carts: fetchFromLocalStorage(),
    itemsCount: 0,
    totalAmount: 0,
    isCartMessageOn: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isItemInCart = state.carts.find((item:any)=> item.id === action.payload.id);

            if(isItemInCart){
                const tempCart = state.carts?.map((item:any) => {
                    if(item.id === action.payload.id){
                        let tempQty = item.quantity + action.payload.quantity;
                        let tempTotalPrice = tempQty * item.price;

                        return {
                            ...item, quantity: tempQty, totalPrice: tempTotalPrice
                        }
                    } else {
                        return item;
                    }
                });

                state.carts = tempCart;
                storeInLocalStorage(state.carts);
            } else {
                state.carts.push(action.payload);
                storeInLocalStorage(state.carts);
            }
        },

        removeFromCart: (state, action) => {
            const tempCart = state.carts.filter((item:any)=> item.id !== action.payload);
            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },

        clearCart: (state) => {
            state.carts = [];
            storeInLocalStorage(state.carts);
        },

        getCartTotal: (state) => {
            state.totalAmount = state.carts.reduce((cartTotal: any, cartItem: { totalPrice: any; }) => {
                return cartTotal += cartItem.totalPrice
            }, 0);

            state.itemsCount = state?.carts?.length;
        },

        toggleCartQty: (state, action) => {
            const tempCart = state?.carts?.map((item:any) => {
                if(item.id === action.payload.id){
                    let tempQty:number = item.quantity;
                    let tempTotalPrice:number= item.totalPrice;

                    if(action.payload.type === "INC"){
                        tempQty++;
                        if(tempQty === item.stock) tempQty = item.stock;
                        tempTotalPrice = tempQty * item.discountedPrice;
                       
                    }

                    if(action.payload.type === "DEC"){
                        tempQty--;
                        if(tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    return {...item, quantity: tempQty, totalPrice: tempTotalPrice};
                } else {
                    return item;
                }
            });

            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },

        setCartMessageOn: (state:any) => {
            state.isCartMessageOn = true;
        },

        setCartMessageOff: (state:any) => {
            state.isCartMessageOn = false;
        }
    }
});

export const {addToCart, setCartMessageOff, setCartMessageOn, getCartTotal, toggleCartQty, clearCart, removeFromCart} = cartSlice.actions;
export const getAllCarts = (state:any) => state?.carts?.carts;
export const getCartItemsCount = (state:any) => state?.carts?.itemsCount;


export default cartSlice.reducer;
