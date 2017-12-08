import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { HttpAuthClient } from './http-auth-client';

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
        HttpAuthClient
    ]
})
export class CoreModule { }
