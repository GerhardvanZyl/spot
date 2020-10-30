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
import { LoginComponent } from './ui-components/login/login.component';
import { RootComponent } from './ui-components/root/root.component';
import { AddressComponent } from './ui-components/address/address.component';
import { ContactInfoComponent } from './ui-components/contact-info/contact-info.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './ui-components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    PracticeComponent,
    PracticesComponent,
    DonorsComponent,
    DonorComponent,
    LoginComponent,
    RootComponent,
    AddressComponent,
    ContactInfoComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    NgbModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
