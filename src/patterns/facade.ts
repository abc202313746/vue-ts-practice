class AuthService {
    login(): string {
        return "token-123";
    }
}
class InventoryService {
    reserve(sku: string, qty: number): string {
        return `재고 예약 완료 (SKU=${sku}, 수량=${qty})`;
    }
}
class PaymentService {
    pay(method: "card" | "bank", amount: number): string {
        return `결제 성공 (${method}, ₩${amount.toLocaleString()})`;
    }
}
class ShippingService {
    ship(address: string): string {
        return `배송 시작 → ${address}`;
    }
}

class OrderFacade {
    private auth: AuthService;
    private inv: InventoryService;
    private paym: PaymentService;
    private shipper: ShippingService;

    constructor() {
        this.auth = new AuthService();
        this.inv = new InventoryService();
        this.paym = new PaymentService();
        this.shipper = new ShippingService();
    }

    placeOrder(params: {
        sku: string;
        qty: number;
        method: "card" | "bank";
        amount: number;
        address: string;
    }): string[] {
        const log: string[] = [];
        log.push("🎭 [Facade] 주문 처리 시작");
        const token = this.auth.login();
        log.push(`토큰 발급: ${token}`);
        log.push(this.inv.reserve(params.sku, params.qty));
        log.push(this.paym.pay(params.method, params.amount));
        log.push(this.shipper.ship(params.address));
        log.push("🎭 [Facade] 주문 처리 완료");
        return log;
    }
}

export function demonstrateFacadePattern(): string[] {
    const facade = new OrderFacade();
    return facade.placeOrder({
        sku: "LAPTOP-4090",
        qty: 1,
        method: "card",
        amount: 3990000,
        address: "전북 전주시 123",
    });
}
