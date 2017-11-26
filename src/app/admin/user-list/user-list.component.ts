import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/user.service';
import { User } from '../../core/models/user.model';

@Component({
    selector: 'ca7o-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    users: Array<User>

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.all()
            .subscribe(
                users => this.users = users,
                err => console.log('err', err)
            )
    }

}
