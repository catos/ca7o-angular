import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'

import { WsClientEvent, WsClientEventType } from '../../core/models/ws-client-event.model'
import { WebSocketService } from "../../core/services/web-socket.service";
import { PainterHelper } from "./painter.helper";
import { PainterTool } from "../models/painter-tool.enum";
import { Vector2 } from "../models/vector-2.model";
import { Vector2Path } from "../models/vector-2-path.model";

@Component({
    selector: 'ca7o-painter',
    templateUrl: './painter.component.html',
    styleUrls: ['./painter.component.css']
})
export class PainterComponent implements OnInit {
    @ViewChild('myCanvas') canvasRef: ElementRef;
    context: CanvasRenderingContext2D

    confirmOperation: boolean = false
    isDrawing: boolean = false
    drawingDirection: string = ''
    canvas: {
        width: 0
        height: 0
    }

    path: Vector2Path = { from: new Vector2(), to: new Vector2() }

    // TODO: debug
    mousePosition: Vector2 = { x: 0, y: 0 }

    currentTool: PainterTool = PainterTool.Brush
    brushSize: number = 5
    foregroundColor: string = '#000000'
    backgroundColor: string = '#ffffff'
    colors: Array<any> = [
        { id: 'niggahs-black', name: 'Niggahs Black', hex: '#000000', isSelected: false },
        { id: 'titanium-white', name: 'Titanium White', hex: '#ffffff', isSelected: false },
        { id: 'phtalo-green', name: 'Phtalo Green', hex: '#123524', isSelected: true },
        { id: 'prussian-blue', name: 'Prussian Blue', hex: '#003153', isSelected: false },
        { id: 'van-dyke-brown', name: 'Van Dyke Brown', hex: '#584630', isSelected: false },
        { id: 'alizarin-crimson', name: 'Alizarin Crimson', hex: '#E32636', isSelected: false },
        { id: 'cadmium-yellow', name: 'Cadmium Yellow', hex: '#fff600', isSelected: false }
    ]

    constructor(
        private helper: PainterHelper,
        private wss: WebSocketService
    ) {
        this.wss.on('event').subscribe(event => this.onEvent(event))
    }

    ngOnInit() {
        this.context = this.canvasRef.nativeElement.getContext('2d')
    }

    // ----------------------------------------------------------

    // TODO: refactor
    onEvent(event: WsClientEvent) {
        switch (event.type) {
            case WsClientEventType.StartDraw:
                this.context.beginPath()
                break;

            case WsClientEventType.Draw:
                this.context.moveTo(event.value.from.x, event.value.from.y)
                this.context.lineTo(event.value.to.x, event.value.to.y)
                this.context.stroke()
                break;

            case WsClientEventType.StopDraw:
                this.context.closePath()
                break;

            case WsClientEventType.ClearCanvas:
                // this.context.fillStyle = '#ffffff'
                // this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                break;

            // TODO: RPC vs GameStateSync
            case WsClientEventType.GameStateChange:
                console.log('gamestatechange', event)

                this.colors.forEach(c => {
                    c.isSelected = c.id === event.value.color.id
                })
                this.foregroundColor = event.value.color.hex

                // const sound = new Howl({
                //     src: '/static/sounds/' + color.id + '.ogg',
                //     volume: 0.5
                // })        
                // sound.play()
                break;
        }
    }

    // ----------------------------------------------------------

    // TODO: if current client is drawing player, emit event AND draw (ignore .on('draw'))
    draw(from: Vector2, to: Vector2) {
        this.wss.emit(WsClientEventType.Draw, { from: from, to: to })
    }

    clearCanvas() {
        this.wss.emit(WsClientEventType.ClearCanvas, {})
    }

    changeForegroundColor(color: any) {
        this.wss.emit(WsClientEventType.GameStateChange, { color })
    }

    // ----------------------------------------------------------

    mouseDown(event: MouseEvent) {
        this.wss.emit(WsClientEventType.StartDraw, {})

        this.context.strokeStyle = this.foregroundColor
        if (event.which === 3) {
            this.context.strokeStyle = this.backgroundColor
        }
        this.mousePosition = this.helper.getCoords(event, this.context.lineWidth)
        if (this.currentTool === PainterTool.Brush) {
            this.context.beginPath()
            this.isDrawing = true
            this.path.from = this.mousePosition
            this.draw(this.path.from, this.path.from)
        }
        if (this.currentTool === PainterTool.Fill) {
            // this.fill(event)
            console.log('TODO: fill')
        }
        return false
    }

    mouseUp(event: MouseEvent) {
        this.wss.emit(WsClientEventType.StopDraw, {})
        
        this.context.closePath()
        this.isDrawing = false
        this.drawingDirection = ''
    }

    mouseMove(event: MouseEvent) {
        this.path.to = this.helper.getCoords(event, this.context.lineWidth)
        this.drawingDirection = this.helper.calculateDrawingDirection(this.path.from)

        if (this.isDrawing) {
            // Lock axis according to drawingDirection
            if (event.shiftKey) {
                if (this.drawingDirection === 'horizontal') {
                    this.path.to.y = this.path.from.y
                }
                if (this.drawingDirection === 'vertical') {
                    this.path.to.x = this.path.from.x
                }
            }
            this.draw(this.path.from, this.path.to)
        }
        this.path.from = this.path.to
    }

    mouseOut(event: MouseEvent) {
        this.context.closePath()
        this.isDrawing = false
    }

}
