export interface PricingStrategy {
    calc(amount: number): number;
}

export class NormalStrategy implements PricingStrategy {
    calc(a: number) { return a; }
}
export class StudentStrategy implements PricingStrategy {
    calc(a: number) { return Math.round(a * 0.8); }
}
export class BlackFridayStrategy implements PricingStrategy {
    calc(a: number) { return Math.round(a * 0.6); }
}

export class Checkout {
    private strategy: PricingStrategy;
    constructor(strategy: PricingStrategy) {
        this.strategy = strategy;
    }
    setStrategy(s: PricingStrategy) {
        this.strategy = s;
    }
    pay(amount: number): string {
        const final = this.strategy.calc(amount);
        return `🧠 [Strategy] 원가 ₩${amount.toLocaleString()} → 최종 ₩${final.toLocaleString()}`;
    }
}

export function demonstrateStrategyPattern(): string[] {
    const log: string[] = [];
    const checkout = new Checkout(new NormalStrategy());
    log.push(checkout.pay(10000));
    checkout.setStrategy(new StudentStrategy());
    log.push(checkout.pay(10000));
    checkout.setStrategy(new BlackFridayStrategy());
    log.push(checkout.pay(10000));
    return log;
}
