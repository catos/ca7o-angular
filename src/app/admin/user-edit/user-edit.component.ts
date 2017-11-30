import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../core/user.service';
import { User } from '../../core/models/user.model';

@Component({
    selector: 'ca7o-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    user: User

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.user = new User()
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.userService.get(id).subscribe(
            user => this.user = user,
            err => console.log('err', err)
        )
    }

    onSubmit() {
        this.userService.update(this.user).subscribe(
            user => {
                this.user = user
                this.router.navigate(['/admin'])
            },
            err => console.log('err', err)
        )
    }
}
