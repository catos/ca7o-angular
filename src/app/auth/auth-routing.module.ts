import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login/login.component'

const routes: Routes = [
    { path: 'login', component: LoginComponent }
    // TODO: Add register
    // { path: 'register', component: RegisterComponent },
    // TODO: Add forgot-password
    // { path: 'forgot-password', component: ForgotPasswordComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
