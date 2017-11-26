import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { UserListComponent } from './user-list/user-list.component'
import { UserEditComponent } from "./user-edit/user-edit.component";

const routes: Routes = [{
    path: '',
    component: AdminComponent,    
    children: [
        { path: '', component: UserListComponent },
        { path: 'users', component: UserListComponent },
        { path: 'users/:id', component: UserEditComponent }
    ]
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}