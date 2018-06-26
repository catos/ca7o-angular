import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { CoreModule } from '../core/core.module'
import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component'
import { UserIndexComponent } from './user-index/user-index.component'
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component'

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
        CoreModule,

        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        UserIndexComponent,
        UserEditComponent,
        UserCreateComponent
    ]
})
export class AdminModule { }
