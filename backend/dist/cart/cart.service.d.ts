export interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}
export interface Cart {
    sessionId: string;
    items: CartItem[];
    total: number;
}
export declare class CartService {
    private carts;
    private DEFAULT_SESSION;
    private calculateTotal;
    getCart(sessionId?: string): Cart;
    addItem(sessionId: string | undefined, item: Omit<CartItem, 'quantity'> & {
        quantity?: number;
    }): Cart;
    updateItem(sessionId: string | undefined, productId: string, quantity: number): Cart;
    removeItem(sessionId: string | undefined, productId: string): Cart;
    clearCart(sessionId?: string): Cart;
}
