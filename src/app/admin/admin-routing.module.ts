import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { UserIndexComponent } from './user-index/user-index.component'
import { UserCreateComponent } from './user-create/user-create.component'
import { UserEditComponent } from "./user-edit/user-edit.component";

const routes: Routes = [{
    path: '',
    component: AdminComponent,    
    children: [
        { path: '', component: UserIndexComponent },
        { path: 'users', component: UserIndexComponent },
        { path: 'users/create', component: UserCreateComponent },
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