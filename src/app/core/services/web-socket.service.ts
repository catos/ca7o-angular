import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client'

import { WsClientEvent, WsClientEventType } from "../models/ws-client-event.model";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../core/services/auth.service";

@Injectable()
export class WebSocketService {
    socket: SocketIOClient.Socket

    constructor(private auth: AuthService) {
        // Create socket
        this.socket = io(environment.apiUrl)

        // Client connected
        this.socket.on('connect', () => {
            this.emit(WsClientEventType.SystemMessage, {
                name: 'system',
                message: `${this.auth.currentUser.name} joined`
            })
        })

        // Client disconnected
        this.socket.on('disconnect', () => {
            this.emit(WsClientEventType.SystemMessage, {
                name: 'system',
                message: `${this.auth.currentUser.name} left`
            })
        })
    }

    /**
     * Adds a listener for a specific event.
     * @param eventName The event that we're listening for
     */
    on(eventName: string): Observable<any> {
        return new Observable(observer => {

            this.socket.on(eventName, data => {
                observer.next(data);
            });

            // observable is disposed
            return () => {
                this.socket.off(eventName);
            }

        });
    }

    /**
     * Send a socket event
     * @param type The type of WsClientEventType to send
     * @param value The payload to send
     */
    emit(type: WsClientEventType, value: any) {
        const clientEvent: WsClientEvent = {
            client: this.socket.id,
            timestamp: new Date(),
            type: type,
            value: value
        }

        this.socket.emit('event', clientEvent)
    }
}