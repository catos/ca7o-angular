export class WsClientEvent {
    client: string
    timestamp: Date
    type: WsClientEventType
    value: any
}

export enum WsClientEventType {
    Message,
    SystemMessage,

    GameStateChange,
    Draw
}