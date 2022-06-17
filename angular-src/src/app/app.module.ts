import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { HttpClientModule } from '@angular/common/http';
import { ShopService } from './services/shop.service';
import { FocusedDirective } from './directives/focused.directive';
import { AutocompleteComponent } from './shared/components/autocomplete/autocomplete.component';
import { CartComponent } from './shop/cart/cart.component';
import { DefaultImageComponent } from './shared/components/default-image/default-image.component';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    ShopComponent,
    FocusedDirective,
    CartComponent,
    DefaultImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ShopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
