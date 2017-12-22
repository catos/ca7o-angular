import { Component, OnInit } from '@angular/core'

import { environment } from '../../../environments/environment'
import { AuthService } from "../../core/services/auth.service";

import { WsClientEvent, WsClientEventType } from '../../core/models/ws-client-event.model'
import { WebSocketService } from "../../core/services/web-socket.service";

@Component({
    selector: 'ca7o-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    messages: Array<WsClientEvent> = []

    constructor(
        private auth: AuthService,
        private wss: WebSocketService
    ) {}

    ngOnInit() {
        this.wss.on('event').subscribe(
            (response: WsClientEvent) => {
                if (response.type === WsClientEventType.Message || 
                    response.type === WsClientEventType.SystemMessage) {
                    this.messages.push(response)
                }
            }
        )
    }

    sendMessage(value: string) {        
        if (!value.length) {
            return
        }

        this.wss.emit(WsClientEventType.Message, {
            name: this.auth.currentUser.name,
            message: value
        })
    }

}