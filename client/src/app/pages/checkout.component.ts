import { Component } from "@angular/core";
import { DataService } from '../../shared/dataService';
import { Router } from "@angular/router";
import { Store } from "../services/store.service";


@Component({
  selector: "checkout",
  templateUrl: "checkout.component.html",
 // styleUrls: ['checkout.component.css']
})
export class Checkout {

  constructor(public data: DataService, public store: Store, public router: Router) {
  }

  errorMessage: string = "";

	onCheckout() {
		this.errorMessage = ""; //kad isvalyti message po paspaudimo
		this.store.checkout().subscribe(
			() => {
			//if it succeeds movinam į main page
			this.router.navigate(["/"]);
			},
			err_ => {
				this.errorMessage = `Failed to checkout: ${err_}`;
			}
		)
	}

}


