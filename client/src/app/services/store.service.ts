import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { LoginRequest } from  "../../shared/LoginResults";
import { LoginResults } from  "../../shared/LoginResults";
import { map } from "rxjs/operators";
import { Order, OrderItem } from "../../shared/Order";
import { Product } from "../../shared/Product";

@Injectable()

export class Store {
    constructor(private http: HttpClient) { }

    public order: Order = new Order();
    public products: Product[] = [];

    //prisijungimu variables
    public token = "";
    public expiration = new Date();

    get loginRequired(): boolean {
        return this.token.length === 0 || this.expiration < new Date();//getteris kad butu galima puslapiuose tikrinti
    }
    
    login(creds: LoginRequest) {
        return this.http.post<LoginResults>("/account/createtoken", creds) //expecting for LoginResults to be returned
            .pipe(map(data => {
                this.token = data.token;
                this.expiration = data.expiration;
            }))
    };

    checkout() {
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`) //setting authorization to bearer
        console.log("Bearer token type has been provided");
        return this.http.post("/api/orders", this.order, { headers: headers })
            .pipe(map(() => {
                this.order = new Order();
            }));

    };


    loadProducts(): Observable<void> {
        return this.http.get<[]>("/api/products")
            .pipe(map(data =>
            {
                this.products = data;
                return;
            }));
        }

    addToOrder(product: Product) {

        let newItem: OrderItem;
        newItem = this.order.items.find(o => o.id == product.id);
        if (newItem!=null) {
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