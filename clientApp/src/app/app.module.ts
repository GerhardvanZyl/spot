import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PracticeComponent } from './ui-components/practice/practice.component';
import { PracticesComponent } from './ui-components/practices/practices.component';
import { DonorsComponent } from './ui-components/donors/donors.component';
import { DonorComponent } from './ui-components/donor/donor.component';

@NgModule({
  declarations: [
    AppComponent,
    PracticeComponent,
    PracticesComponent,
    DonorsComponent,
    DonorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
