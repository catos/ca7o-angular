import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module'
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ContentModule } from './content/content.module'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    
    CoreModule,
    AuthModule,
    AdminModule,
    ContentModule,
    
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
