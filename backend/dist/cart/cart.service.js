"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
let CartService = class CartService {
    carts = new Map();
    DEFAULT_SESSION = 'default-session';
    calculateTotal(items) {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
    getCart(sessionId = this.DEFAULT_SESSION) {
        const items = this.carts.get(sessionId) ?? [];
        return {
            sessionId,
            items,
            total: this.calculateTotal(items),
        };
    }
    addItem(sessionId = this.DEFAULT_SESSION, item) {
        const items = this.carts.get(sessionId) ?? [];
        const existing = items.find((i) => i.productId === item.productId);
        if (existing) {
            existing.quantity += item.quantity ?? 1;
        }
        else {
            items.push({ ...item, quantity: item.quantity ?? 1 });
        }
        this.carts.set(sessionId, items);
        return this.getCart(sessionId);
    }
    updateItem(sessionId = this.DEFAULT_SESSION, productId, quantity) {
        const items = this.carts.get(sessionId) ?? [];
        if (quantity <= 0) {
            return this.removeItem(sessionId, productId);
        }
        const item = items.find((i) => i.productId === productId);
        if (item) {
            item.quantity = quantity;
        }
        this.carts.set(sessionId, items);
        return this.getCart(sessionId);
    }
    removeItem(sessionId = this.DEFAULT_SESSION, productId) {
        const items = this.carts.get(sessionId) ?? [];
        const filtered = items.filter((i) => i.productId !== productId);
        this.carts.set(sessionId, filtered);
        return this.getCart(sessionId);
    }
    clearCart(sessionId = this.DEFAULT_SESSION) {
        this.carts.set(sessionId, []);
        return this.getCart(sessionId);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)()
], CartService);
//# sourceMappingURL=cart.service.js.map