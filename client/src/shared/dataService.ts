import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { map } from 'rxjs/operators';
import { Product } from "./product";
import { Order, OrderItem } from "./order";

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {

    }

    public order: Order = new Order();

    public products: Product[] = [];

    loadProducts(): Observable<boolean> {
        return this.http.get("/api/products")
            .pipe(
                map((data: any[]) => {
                    this.products = data;
                    return true;
                }));
    }
    public checkout() {
        if (!this.order.orderNumber) {
            this.order.orderNumber = this.order.orderDate.getFullYear().toString() + this.order.orderDate.getTime().toString();
        }
        return null;
    }

    public AddToOrder(product: Product) {

        let newItem: OrderItem;
        newItem = this.order.items.find(o => o.id == product.id);
        if (newItem != null) {
            newItem.quantity++;
        }
        else {
            const newItem = new OrderItem();
            newItem.id = product.id;
            newItem.productCategory = product.category;
            newItem.productTitle = product.title;
            newItem.unitPrice = product.price;
            newItem.quantity = 1; //temp 
            this.order.items.push(newItem);
        }

    }

}