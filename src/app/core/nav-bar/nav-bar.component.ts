import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
    selector: 'ca7o-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
    }

    logout() {
        this.authService.logout()
        this.router.navigate(['/'])
    }

}
