import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { User } from '../../core/models/user.model';
import { UserService } from '../../core/user.service';

@Component({
    selector: 'ca7o-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
    user: User

    constructor(
        private router: Router,
        private userService: UserService
    ) {
        this.user = new User()
    }

    ngOnInit() {
    }

    onSubmit() {
        this.userService.create(this.user).subscribe(
            user => {
                this.user = user
                this.router.navigate(['/admin'])
            },
            err => console.log('err', err)
        )
    }
}
