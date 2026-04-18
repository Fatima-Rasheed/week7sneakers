import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(sessionId?: string): import("./cart.service").Cart;
    addItem(body: {
        sessionId?: string;
        productId: string;
        name: string;
        price: number;
        image: string;
        quantity?: number;
    }): import("./cart.service").Cart;
    updateItem(body: {
        sessionId?: string;
        productId: string;
        quantity: number;
    }): import("./cart.service").Cart;
    removeItem(productId: string, sessionId?: string): import("./cart.service").Cart;
    clearCart(sessionId?: string): import("./cart.service").Cart;
}
