import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/user.service';
import { User } from '../../core/models/user.model';

@Component({
    selector: 'ca7o-user-index',
    templateUrl: './user-index.component.html',
    styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {
    users: Array<User>
    filter: string

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getUsers()
    }

    applyFilter() {
        console.log('filter', this.filter);
        this.getUsers(this.filter)
    }

    getUsers(filter?: string) {
        this.userService.all(filter).subscribe(
            users => this.users = users,
            err => console.log('err', err)
        )
    }
}
