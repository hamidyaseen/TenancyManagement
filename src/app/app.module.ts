import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { TopbarComponent } from './top/topbar/topbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryBackendConfigArgs, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './model-data/in-memory-data.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,    
    LoginModule,
    BrowserAnimationsModule,
    (environment.production) ? [] : InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true } as InMemoryBackendConfigArgs)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
