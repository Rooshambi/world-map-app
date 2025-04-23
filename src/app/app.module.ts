import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { HttpClientModule }  from '@angular/common/http';
import { AppRoutingModule }  from './app.routing.module';

import { AppComponent }      from './app.component';               // root
import { WorldComponent }    from './world/world.component';       // the standalone map

@NgModule({
  
  imports: [
    BrowserModule,
    HttpClientModule,        // <-- needed for HttpClient
    AppRoutingModule,
    AppComponent,
    WorldComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }