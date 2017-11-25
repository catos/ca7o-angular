import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';

@NgModule({
    imports: [
        CoreModule,

        AdminRoutingModule
    ],
    declarations: [
        AdminComponent
    ]
})
export class AdminModule { }
