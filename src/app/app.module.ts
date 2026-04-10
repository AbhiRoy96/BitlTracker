import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataDashboardComponent } from './data-dashboard/data-dashboard.component';
import { QuotesComponent } from './quotes/quotes.component';
import { BookingComponent } from './booking/booking.component';
import { environment } from '../environments/environment';


import { LivedataService } from './livedata.service';
import { SocketServiceService } from './socket-service.service';
import { QuoteServiceService } from './quote-service.service';
import { BookingServiceService } from './booking-service.service';




const appRoutes: Routes = [
  { path: '', component: QuotesComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'markets', component: DataDashboardComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'transactions', component: AllTransactionsComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DataDashboardComponent,
    QuotesComponent,
    BookingComponent,
    AllTransactionsComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
  ],
  providers: [
    LivedataService,
    SocketServiceService,
    QuoteServiceService,
    BookingServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
