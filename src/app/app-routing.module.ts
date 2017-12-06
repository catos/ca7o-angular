import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { ContentModule } from './content/content.module';

const routes: Routes = [
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '', redirectTo: 'content', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: 'app/auth/auth.module#AuthModule',
        // TODO: hva er egentlig preload, og hva skal preloades ?
        // data: { preload: true }
    },
    {
        path: 'content',
        loadChildren: 'app/content/content.module#ContentModule',
        // TODO: hva er egentlig preload, og hva skal preloades ?
        // data: { preload: true }
    },
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        // TODO: implement canLoad ?
        // canLoad: [AuthGuardService]
        // data: { preload: true }
    }
    // {
    //     path: 'todo',
    //     loadChildren: './todo/todo.module#TodoModule',
    //     // data: { preload: true }
    // },
    // {
    //     path: 'threex',
    //     loadChildren: './threex/threex.module#ThreexModule',
    //     // data: { preload: true }
    // }
]

@NgModule({
    imports: [
        ContentModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
