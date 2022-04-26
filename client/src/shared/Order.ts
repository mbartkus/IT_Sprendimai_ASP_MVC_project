import { Product } from "./Product";



   export class OrderItem {
        id: number;
        productId: number;
        quantity: number;
        unitPrice: number;
        productTitle: string;
        productCategory: string;
    }
export class Order {
    orderId: number;

    orderDate: Date; //= new Date;
    orderNumber: string = Math.random().toString(36).substr(2, 5);
    items: OrderItem[] = []; //nurodau tipa
    get subtotal(): number {
        const result = this.items.reduce((total, currentVal) =>
        {return total + currentVal.unitPrice * currentVal.quantity }, 0);
        return result;
    };
}


