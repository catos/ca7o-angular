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
    // TODO: MessageType to replace any
    messages: Array<any> = []

    constructor(
        private auth: AuthService,
        private wss: WebSocketService
    ) {}

    ngOnInit() {
        this.wss.on('event').subscribe(
            (response: WsClientEvent) => {
                // if (response.type === WsClientEventType.Message || 
                //     response.type === WsClientEventType.SystemMessage) {
                if (response.type !== WsClientEventType.Draw) {

                    const from = response.value.name || 'system'
                    const message = response.value.message || WsClientEventType[response.type] || ''
                    this.messages.push({
                        timestamp: response.timestamp,
                        from: from,
                        message: message
                    })
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