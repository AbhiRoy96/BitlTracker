import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataDashboardComponent } from './data-dashboard/data-dashboard.component';


import { LivedataService } from './livedata.service';
import { SocketServiceService } from './socket-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DataDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    LivedataService,
    SocketServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
