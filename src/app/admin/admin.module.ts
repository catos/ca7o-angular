import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { CoreModule } from '../core/core.module'
import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component'
import { UserListComponent } from './user-list/user-list.component'
import { UserEditComponent } from './user-edit/user-edit.component'

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
        UserListComponent,
        UserEditComponent
    ]
})
export class AdminModule { }
