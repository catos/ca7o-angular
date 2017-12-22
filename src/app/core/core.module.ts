import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { HttpAuthClient } from './services/http-auth-client';
import { WebSocketService } from "./services/web-socket.service";

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule
    ],
    exports: [NavBarComponent],
    declarations: [NavBarComponent],
    providers: [
        UserService,
        AuthService,
        HttpAuthClient,
        WebSocketService
    ]
})
export class CoreModule { }
