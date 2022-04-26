import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { DataService } from '../../shared/dataService';
import { Store } from '../services/store.service'
@Component({
    selector: "cart",
        templateUrl: "cartView.component.html",
        styleUrls: ["cartView.component.css"]
})




export class CartView {
    constructor(public store: Store, public data: DataService, public router: Router ) {
    }

  public   onCheckout() {
      //  if (this.data.loginRequired) { temporary
        if (this.data!=null) {
            // Force Login
            this.router.navigate(["login"]);
        } else {
            // Go to checkout
            this.router.navigate(["checkout"]);
        }
    }
}

