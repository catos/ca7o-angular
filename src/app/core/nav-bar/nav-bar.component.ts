import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ITokenResponse } from '../models/token-response.interface';

@Component({
    selector: 'ca7o-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    constructor(
        private router: Router,
        public auth: AuthService) { }

    ngOnInit() {
    }

    logout() {        
        this.auth.logout()
        this.router.navigate(['/'])
    }

}
