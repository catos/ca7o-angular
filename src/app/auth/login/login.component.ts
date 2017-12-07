import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
    selector: 'ca7o-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    model: any = {};
    loading = false
    error = ''

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    onSubmit() {
        this.loading = true
        this.authService
            .login(this.model.username, this.model.password)
            .subscribe(
            result => {
                if (result.success === true) {
                    this.router.navigate(['/'])
                } else {
                    this.error = result.message
                    this.loading = false
                }
            },
            err => {
                this.error = `Error occured: ${err.message}`
                this.loading = false
            }
            )
    }

    loginAs(username: string, password: string) {
        this.model.username = username;
        this.model.password = password;
    }

}
