import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Store } from './services/store.service';
import ProductListView from './views/productListView.component';
import { CartView } from './views/cartView.component';
import router from './router/index';
import { CheckboxRequiredValidator } from '@angular/forms';
import { Checkout } from './pages/checkout.component';
import { ShopPage } from './pages/ShopPage.component';
import { DataService } from '../shared/dataService';
import { LoginPage } from './pages/LoginPage.comoponent';
import { authActivator } from './services/authActivator';
import { FormsModule } from '@angular/forms';






//enableProdMode();
@NgModule({
  declarations: [
        AppComponent,
        ProductListView,
        CartView,
        ShopPage,
        Checkout,
        LoginPage
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      router,
      FormsModule

      
    ],
    providers: [Store, DataService, authActivator],
  bootstrap: [AppComponent]
})
export class AppModule { }
