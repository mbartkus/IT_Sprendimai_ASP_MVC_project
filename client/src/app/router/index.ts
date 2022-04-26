import { ShopPage } from "../pages/ShopPage.component"
import { Checkout } from "../pages/checkout.component"
import { RouterModule } from "@angular/router"
import { LoginPage } from "../pages/LoginPage.comoponent";
import { authActivator } from "../services/authActivator";

const routes = [
    { path: "", component: ShopPage }, //, canActivate: [authActivator]
    { path: "checkout", component: Checkout }, //, canActivate: [authActivator]
    { path: "login", component: LoginPage},
    { path: "**", redirectTo: "/" }];//gražina į root



//const router = RouterModule.forRoot(routes);
const router = RouterModule.forRoot(routes, { useHash: true });
export default router;      