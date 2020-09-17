import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AppService,
    NgxSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
