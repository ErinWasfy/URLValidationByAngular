import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ValidationCheck } from './validation/validation-check.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';

const appRoutes:Routes=[
{path:'/api',component:AppComponent}
]
@NgModule({
  declarations: [
    AppComponent,ValidationCheck
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule
  ],
  providers: [Document,HttpClient,XMLHttpRequest],
  bootstrap: [AppComponent]
})
export class AppModule { }
