import { Component, OnInit } from '@angular/core'
import * as io from 'socket.io-client'

import { environment } from '../../../environments/environment'
import { UserService } from '../../core/services/user.service'
import { User } from '../../core/models/user.model'

@Component({
    selector: 'ca7o-user-index',
    templateUrl: './user-index.component.html',
    styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {
    filterThreshold: number = 3
    users: Array<User>
    filter: string = ''
    socket: SocketIOClient.Socket

    constructor(private userService: UserService) {
        
        this.socket = io(environment.apiUrl)
        this.socket.on('connect', () => {
            console.log('connect')
        })
        this.socket.on('event', (data) => {
            console.log('event', data)
        })
        this.socket.on('disconnect', () => {
            console.log('disconnect')
        })
    }

    ngOnInit() {
        this.getUsers()
    }

    applyFilter() {
        if (this.filter.length >= this.filterThreshold) {
            this.getUsers(this.filter)
        }

        if (this.filter.length === (this.filterThreshold - 1)) {
            this.getUsers()
        }
    }

    resetFilter() {
        this.filter = ''
    }

    private getUsers(filter?: string) {
        this.userService.all(filter).subscribe(
            users => this.users = users,
            err => console.log('err', err)
        )
    }
}
