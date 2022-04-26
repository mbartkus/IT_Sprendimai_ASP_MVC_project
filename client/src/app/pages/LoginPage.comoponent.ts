import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "../services/store.service";


@Component({
	selector: "login-page",
	templateUrl: "LoginPage.component.html"
})
export class LoginPage {
	constructor(public store: Store, private router: Router) { }
	public creds = {
		username: "",
		password: "",
	}
	public errorMessage = "";
	onLogin() {
		console.log("button is clicked");
		this.store.login(this.creds).subscribe(() => {
			//jeigu prisiloginta
			console.log("getting creds");
			
			if (this.store.order.items.length > 0) {
				this.router.navigate(["checkout"]);
				console.log("store.order.items.length > 0");
				console.log("navigate([checkout]");
			}

			else {
				this.router.navigate(["/"]);	//navigates to store
				console.log("navigate([/] ");
			}
		},
			error_ => {
				console.log(error_ );
				this.errorMessage = `Failed to log in: ${error_ }`;
			});
	}
			
	
}