(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Repository\IT_Sprendimai\client\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Fx4P":
/*!*****************************!*\
  !*** ./src/shared/order.ts ***!
  \*****************************/
/*! exports provided: OrderItem, Order */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderItem", function() { return OrderItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Order", function() { return Order; });
class OrderItem {
}
class Order {
    constructor() {
        this.orderNumber = Math.random().toString(36).substr(2, 5);
        this.items = []; //nurodau tipa
    }
    get subtotal() {
        const result = this.items.reduce((total, currentVal) => { return total + currentVal.unitPrice * currentVal.quantity; }, 0);
        return result;
    }
    ;
}


/***/ }),

/***/ "GtJH":
/*!*****************************!*\
  !*** ./src/shared/Order.ts ***!
  \*****************************/
/*! exports provided: OrderItem, Order */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderItem", function() { return OrderItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Order", function() { return Order; });
class OrderItem {
}
class Order {
    constructor() {
        this.orderNumber = Math.random().toString(36).substr(2, 5);
        this.items = []; //nurodau tipa
    }
    get subtotal() {
        const result = this.items.reduce((total, currentVal) => { return total + currentVal.unitPrice * currentVal.quantity; }, 0);
        return result;
    }
    ;
}


/***/ }),

/***/ "MtBC":
/*!*******************************************!*\
  !*** ./src/app/services/store.service.ts ***!
  \*******************************************/
/*! exports provided: Store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _shared_Order__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/Order */ "GtJH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class Store {
    constructor(http) {
        this.http = http;
        this.order = new _shared_Order__WEBPACK_IMPORTED_MODULE_2__["Order"]();
        this.products = [];
        //prisijungimu variables
        this.token = "";
        this.expiration = new Date();
    }
    get loginRequired() {
        return this.token.length === 0 || this.expiration < new Date(); //getteris kad butu galima puslapiuose tikrinti
    }
    login(creds) {
        return this.http.post("/account/createtoken", creds) //expecting for LoginResults to be returned
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(data => {
            this.token = data.token;
            this.expiration = data.expiration;
        }));
    }
    ;
    checkout() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]().set("Authorization", `Bearer ${this.token}`); //setting authorization to bearer
        console.log("Bearer token type has been provided");
        return this.http.post("/api/orders", this.order, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => {
            this.order = new _shared_Order__WEBPACK_IMPORTED_MODULE_2__["Order"]();
        }));
    }
    ;
    loadProducts() {
        return this.http.get("/api/products")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(data => {
            this.products = data;
            return;
        }));
    }
    addToOrder(product) {
        let newItem;
        newItem = this.order.items.find(o => o.id == product.id);
        if (newItem != null) {
            newItem.quantity++;
        }
        else {
            const newItem = new _shared_Order__WEBPACK_IMPORTED_MODULE_2__["OrderItem"]();
            newItem.id = product.id;
            newItem.productCategory = product.category;
            newItem.productTitle = product.title;
            newItem.unitPrice = product.price;
            newItem.quantity = 1; //temp 
            this.order.items.push(newItem);
        }
    }
}
Store.??fac = function Store_Factory(t) { return new (t || Store)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["????inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
Store.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["????defineInjectable"]({ token: Store, factory: Store.??fac });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class AppComponent {
    constructor() {
        this.title = 'Shop';
    }
}
AppComponent.??fac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: AppComponent, selectors: [["appComponentPage"]], decls: 6, vars: 1, consts: [[1, "row"], [1, "col-12"], [1, "col-3"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](4, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](ctx.title);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], encapsulation: 2 });


/***/ }),

/***/ "UDF3":
/*!*********************************************!*\
  !*** ./src/app/pages/ShopPage.component.ts ***!
  \*********************************************/
/*! exports provided: ShopPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopPage", function() { return ShopPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _views_productListView_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/productListView.component */ "wu5N");
/* harmony import */ var _views_cartView_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/cartView.component */ "vYog");



class ShopPage {
}
ShopPage.??fac = function ShopPage_Factory(t) { return new (t || ShopPage)(); };
ShopPage.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: ShopPage, selectors: [["shop-page"]], decls: 6, vars: 0, consts: [[1, "row"], [1, "col-9"], [1, "col-3"]], template: function ShopPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](2, "product-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](4, "cart");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](5, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    } }, directives: [_views_productListView_component__WEBPACK_IMPORTED_MODULE_1__["default"], _views_cartView_component__WEBPACK_IMPORTED_MODULE_2__["CartView"]], encapsulation: 2 });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _services_store_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/store.service */ "MtBC");
/* harmony import */ var _views_productListView_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/productListView.component */ "wu5N");
/* harmony import */ var _views_cartView_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/cartView.component */ "vYog");
/* harmony import */ var _router_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./router/index */ "bZtV");
/* harmony import */ var _pages_checkout_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/checkout.component */ "ZK+g");
/* harmony import */ var _pages_ShopPage_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/ShopPage.component */ "UDF3");
/* harmony import */ var _shared_dataService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/dataService */ "qykp");
/* harmony import */ var _pages_LoginPage_comoponent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/LoginPage.comoponent */ "bmyD");
/* harmony import */ var _services_authActivator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/authActivator */ "qI91");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ "tyNb");















//enableProdMode();
class AppModule {
}
AppModule.??fac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_13__["????defineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_13__["????defineInjector"]({ providers: [_services_store_service__WEBPACK_IMPORTED_MODULE_3__["Store"], _shared_dataService__WEBPACK_IMPORTED_MODULE_9__["DataService"], _services_authActivator__WEBPACK_IMPORTED_MODULE_11__["authActivator"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
            _router_index__WEBPACK_IMPORTED_MODULE_6__["default"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["????setNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _views_productListView_component__WEBPACK_IMPORTED_MODULE_4__["default"],
        _views_cartView_component__WEBPACK_IMPORTED_MODULE_5__["CartView"],
        _pages_ShopPage_component__WEBPACK_IMPORTED_MODULE_8__["ShopPage"],
        _pages_checkout_component__WEBPACK_IMPORTED_MODULE_7__["Checkout"],
        _pages_LoginPage_comoponent__WEBPACK_IMPORTED_MODULE_10__["LoginPage"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"], _angular_router__WEBPACK_IMPORTED_MODULE_14__["RouterModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"]] }); })();


/***/ }),

/***/ "ZK+g":
/*!*********************************************!*\
  !*** ./src/app/pages/checkout.component.ts ***!
  \*********************************************/
/*! exports provided: Checkout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Checkout", function() { return Checkout; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dataService */ "qykp");
/* harmony import */ var _services_store_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/store.service */ "MtBC");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





function Checkout_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](ctx_r0.errorMessage);
} }
function Checkout_tr_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipe"](7, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipe"](10, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const o_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate2"]("", o_r2.productCategory, ": ", o_r2.productTitle, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](o_r2.quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipeBind3"](7, 5, o_r2.unitPrice, "EUR", "symbol"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipeBind3"](10, 9, o_r2.unitPrice * o_r2.quantity, "EUR", "symbol"));
} }
class Checkout {
    constructor(data, store, router) {
        this.data = data;
        this.store = store;
        this.router = router;
        this.errorMessage = "";
    }
    onCheckout() {
        this.errorMessage = ""; //kad isvalyti message po paspaudimo
        this.store.checkout().subscribe(() => {
            //if it succeeds movinam ?? main page
            this.router.navigate(["/"]);
        }, err_ => {
            this.errorMessage = `Failed to checkout: ${err_}`;
        });
    }
}
Checkout.??fac = function Checkout_Factory(t) { return new (t || Checkout)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_shared_dataService__WEBPACK_IMPORTED_MODULE_1__["DataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_store_service__WEBPACK_IMPORTED_MODULE_2__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
Checkout.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: Checkout, selectors: [["checkout"]], decls: 29, vars: 12, consts: [[1, "row"], ["class", "alert alert-warning", 4, "ngIf"], [1, "table", "table-bordered", "table-hover"], [4, "ngFor", "ngForOf"], [1, "col-md-4", "col-md-offset-8", "text-right"], [1, "table", "table-condensed"], [1, "text-right"], [1, "btn", "btn-success", 3, "click"], ["routerLink", "/", 1, "btn", "btn-info"], [1, "alert", "alert-warning"]], template: function Checkout_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, Checkout_div_1_Template, 2, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](3, "Confirm Order");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](4, "table", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](5, Checkout_tr_5_Template, 11, 13, "tr", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "table", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](9, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](10, "Subtotal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipe"](13, "currency");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](14, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](16, "Shipping");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](18, "$ 0.00");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](20, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](21, "Total:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipe"](24, "currency");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](25, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function Checkout_Template_button_click_25_listener() { return ctx.onCheckout(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](26, "Complete Purchase");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](27, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](28, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", ctx.errorMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.store.order.items);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipeBind3"](13, 4, ctx.store.order.subtotal, "EUR", "symbol"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipeBind3"](24, 8, ctx.store.order.subtotal, "EUR", "symbol"));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CurrencyPipe"]], encapsulation: 2 });


/***/ }),

/***/ "bZtV":
/*!*********************************!*\
  !*** ./src/app/router/index.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_ShopPage_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/ShopPage.component */ "UDF3");
/* harmony import */ var _pages_checkout_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/checkout.component */ "ZK+g");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pages_LoginPage_comoponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/LoginPage.comoponent */ "bmyD");




const routes = [
    { path: "", component: _pages_ShopPage_component__WEBPACK_IMPORTED_MODULE_0__["ShopPage"] },
    { path: "checkout", component: _pages_checkout_component__WEBPACK_IMPORTED_MODULE_1__["Checkout"] },
    { path: "login", component: _pages_LoginPage_comoponent__WEBPACK_IMPORTED_MODULE_3__["LoginPage"] },
    { path: "**", redirectTo: "/" }
]; //gra??ina ?? root
//const router = RouterModule.forRoot(routes);
const router = _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { useHash: true });
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "bmyD":
/*!***********************************************!*\
  !*** ./src/app/pages/LoginPage.comoponent.ts ***!
  \***********************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/store.service */ "MtBC");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");





function LoginPage_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](ctx_r0.errorMessage);
} }
function LoginPage_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](1, "Username is required!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
function LoginPage_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](1, "Password is required!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
class LoginPage {
    constructor(store, router) {
        this.store = store;
        this.router = router;
        this.creds = {
            username: "",
            password: "",
        };
        this.errorMessage = "";
    }
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
                this.router.navigate(["/"]); //navigates to store
                console.log("navigate([/] ");
            }
        }, error_ => {
            console.log(error_);
            this.errorMessage = `Failed to log in: ${error_}`;
        });
    }
}
LoginPage.??fac = function LoginPage_Factory(t) { return new (t || LoginPage)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_store_service__WEBPACK_IMPORTED_MODULE_1__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
LoginPage.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: LoginPage, selectors: [["login-page"]], decls: 21, vars: 6, consts: [[1, "row"], [1, "col-md-4", "offset-md-4"], ["class", "alert alert-warning", 4, "ngIf"], ["novalidate", "", 3, "submit"], ["theForm", "ngForm"], [1, "form-group"], ["for", "username"], ["type", "text", "name", "username", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["username", "ngModel"], ["class", "text-danger", 4, "ngIf"], ["for", "password"], ["type", "password", "name", "password", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["password", "ngModel"], ["type", "submit", "value", "Login", 1, "btn", "btn-success", 3, "disabled"], ["routerLink", "/", 1, "btn", "btn-default"], [1, "alert", "alert-warning"], [1, "text-danger"]], template: function LoginPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](2, LoginPage_div_2_Template, 2, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "form", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("submit", function LoginPage_Template_form_submit_3_listener() { return ctx.onLogin(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](7, "Username");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "input", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function LoginPage_Template_input_ngModelChange_8_listener($event) { return ctx.creds.username = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](10, LoginPage_div_10_Template, 2, 0, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](13, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](14, "input", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("ngModelChange", function LoginPage_Template_input_ngModelChange_14_listener($event) { return ctx.creds.password = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](16, LoginPage_div_16_Template, 2, 0, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](18, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "a", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????reference"](4);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????reference"](9);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????reference"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", ctx.errorMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.creds.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", _r2.touched && _r2.invalid && _r2.errors.required);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngModel", ctx.creds.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", _r4.touched && _r4.invalid && _r4.errors.required);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("disabled", _r1.invalid);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["??angular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]], encapsulation: 2 });


/***/ }),

/***/ "qI91":
/*!*******************************************!*\
  !*** ./src/app/services/authActivator.ts ***!
  \*******************************************/
/*! exports provided: authActivator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authActivator", function() { return authActivator; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store.service */ "MtBC");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class authActivator {
    constructor(store, router) {
        this.store = store;
        this.router = router;
    }
    canActivate(route, state) {
        throw new Error("Method not implemented.");
    }
}
authActivator.??fac = function authActivator_Factory(t) { return new (t || authActivator)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????inject"](_store_service__WEBPACK_IMPORTED_MODULE_1__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????inject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
authActivator.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjectable"]({ token: authActivator, factory: authActivator.??fac });
{
}


/***/ }),

/***/ "qykp":
/*!***********************************!*\
  !*** ./src/shared/dataService.ts ***!
  \***********************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _order__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order */ "Fx4P");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class DataService {
    constructor(http) {
        this.http = http;
        this.order = new _order__WEBPACK_IMPORTED_MODULE_1__["Order"]();
        this.products = [];
    }
    loadProducts() {
        return this.http.get("/api/products")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((data) => {
            this.products = data;
            return true;
        }));
    }
    checkout() {
        if (!this.order.orderNumber) {
            this.order.orderNumber = this.order.orderDate.getFullYear().toString() + this.order.orderDate.getTime().toString();
        }
        return null;
    }
    AddToOrder(product) {
        let newItem;
        newItem = this.order.items.find(o => o.id == product.id);
        if (newItem != null) {
            newItem.quantity++;
        }
        else {
            const newItem = new _order__WEBPACK_IMPORTED_MODULE_1__["OrderItem"]();
            newItem.id = product.id;
            newItem.productCategory = product.category;
            newItem.productTitle = product.title;
            newItem.unitPrice = product.price;
            newItem.quantity = 1; //temp 
            this.order.items.push(newItem);
        }
    }
}
DataService.??fac = function DataService_Factory(t) { return new (t || DataService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["????inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"])); };
DataService.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["????defineInjectable"]({ token: DataService, factory: DataService.??fac });


/***/ }),

/***/ "vYog":
/*!*********************************************!*\
  !*** ./src/app/views/cartView.component.ts ***!
  \*********************************************/
/*! exports provided: CartView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartView", function() { return CartView; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/store.service */ "MtBC");
/* harmony import */ var _shared_dataService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/dataService */ "qykp");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





function CartView_tr_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipe"](7, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipe"](10, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const o_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate2"]("", o_r2.productCategory, " - ", o_r2.productTitle, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](o_r2.quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipeBind3"](7, 5, o_r2.unitPrice, "EUR", true));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipeBind3"](10, 9, o_r2.unitPrice * o_r2.quantity, "EUR", true));
} }
function CartView_a_23_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CartView_a_23_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r3.onCheckout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](1, "Checkout");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} }
class CartView {
    constructor(store, data, router) {
        this.store = store;
        this.data = data;
        this.router = router;
    }
    onCheckout() {
        //  if (this.data.loginRequired) { temporary
        if (this.data != null) {
            // Force Login
            this.router.navigate(["login"]);
        }
        else {
            // Go to checkout
            this.router.navigate(["checkout"]);
        }
    }
}
CartView.??fac = function CartView_Factory(t) { return new (t || CartView)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_store_service__WEBPACK_IMPORTED_MODULE_1__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_shared_dataService__WEBPACK_IMPORTED_MODULE_2__["DataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
CartView.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: CartView, selectors: [["cart"]], decls: 25, vars: 8, consts: [[1, "table", "table-condensed", "table-striped"], [4, "ngFor", "ngForOf"], ["colspan", "4"], ["class", "btn btn-success", 3, "click", 4, "ngIf"], [1, "btn", "btn-success", 3, "click"]], template: function CartView_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](1, "Cart");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](4, "table", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](6, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](7, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](8, "Product");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](9, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](10, "#");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](11, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](12, "$");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "Total");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](16, CartView_tr_16_Template, 11, 13, "tr", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "tfoot");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](18, "tfoot");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](20, "td", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipe"](22, "currency");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](23, CartView_a_23_Template, 2, 0, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](24, "hr");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate1"]("Count: ", ctx.store.order.items.length, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.store.order.items);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate1"]("subtotal: ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipeBind3"](22, 4, ctx.store.order.subtotal, "EUR", true), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", ctx.store.order.items.length > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CurrencyPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYXJ0Vmlldy5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "wu5N":
/*!****************************************************!*\
  !*** ./src/app/views/productListView.component.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProductListView; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/store.service */ "MtBC");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");



function ProductListView_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](4, "ul", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipe"](7, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](13, "More information");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](14, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function ProductListView_div_1_Template_button_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r3); const p_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r2.store.addToOrder(p_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](15, "Buy");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const p_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate1"]("", p_r1.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate1"]("Price: ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["????pipeBind2"](7, 4, p_r1.price, "EUR"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate1"]("Category: ", p_r1.category, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate1"]("Description: ", p_r1.description, "");
} }
class ProductListView {
    constructor(store) {
        this.store = store;
    }
    ngOnInit() {
        this.store.loadProducts().subscribe();
    }
}
ProductListView.??fac = function ProductListView_Factory(t) { return new (t || ProductListView)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_store_service__WEBPACK_IMPORTED_MODULE_1__["Store"])); };
ProductListView.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: ProductListView, selectors: [["product-list"]], decls: 2, vars: 1, consts: [[1, "row"], ["class", "col-md-4", 4, "ngFor", "ngForOf"], [1, "col-md-4"], [1, "border", "bg-light", "rounded", "p-1"], [1, "products-props"], ["id", "moreInfoBtn", 1, "btn", "btn-success"], ["id", "Buy", 1, "btn", "btn-success", 3, "click"]], template: function ProductListView_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](1, ProductListView_div_1_Template, 16, 7, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.store.products);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CurrencyPipe"]], encapsulation: 2 });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map