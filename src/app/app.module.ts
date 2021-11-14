import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookComponent } from './components/book/book.component';
import { HeadersInterceptor } from './shared/header.interceptor';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductFiltersComponent } from './components/products/product-filters/product-filters.component';
import { ProductModule } from './components/products/product.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserModule } from './components/user/user.module';
import { PartialModule } from './components/partial/partial.module';
import { LoginModule } from './components/login/login.module';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    ProductCardComponent,
    ProductsListComponent,
    ProductFiltersComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    PartialModule,
    LoginModule,
    
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
