import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as $ from 'jquery';
import { } from "bootstrap";

//needed extras
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

//components
import { NavbarComponent } from './components/navbar/navbar.component';

//pages
import { HomeComponent } from './pages/home/home.component'
import { AboutComponent } from './pages/about/about.component'

//pagination module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  imports: [BrowserModule, AppRoutingModule, CommonModule, FormsModule, HttpModule, NgbModule.forRoot()],
  declarations: [AppComponent, NavbarComponent, HomeComponent, AboutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
