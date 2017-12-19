import { Component, OnInit } from '@angular/core'
import * as io from 'socket.io-client'

import { environment } from '../../../environments/environment'
import { AuthService } from "../../core/services/auth.service";

import { WesketchClientEvent } from '../models/wesketch-client-event.model'

@Component({
    selector: 'ca7o-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    socket: SocketIOClient.Socket
    messages: Array<WesketchClientEvent> = []

    constructor(private auth: AuthService) {
        this.socket = io(environment.apiUrl)
        this.socket.on('connect', () => {
            console.log('connect')
        })
        this.socket.on('event', (data) => {
            console.log('event', data)
            this.messages.push(data)
        })
        this.socket.on('disconnect', () => {
            console.log('disconnect')
        })

    }

    ngOnInit() {
    }

    sendMessage(value: string) {        
        if (!value.length) {
            return
        }

        const clientEvent: WesketchClientEvent = {
            client: this.socket.id,
            timestamp: new Date(),
            type: 'message',
            value: {
                name: this.auth.currentUser.name,
                message: value
            }
        }

        this.socket.emit('event', clientEvent)
    }

}