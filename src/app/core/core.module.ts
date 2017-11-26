import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserService } from './user.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [NavBarComponent],
    declarations: [NavBarComponent],
    providers: [UserService]
})
export class CoreModule { }
