import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import * as io from 'socket.io-client'

import { environment } from '../../../environments/environment'
import { PainterHelper } from "./painter.helper";

import { PainterTool } from "../models/painter-tool.enum";
import { Vector2 } from "../models/vector-2.model";
import { Vector2Path } from "../models/vector-2-path.model";
import { WesketchClientEvent } from "../models/wesketch-client-event.model";

@Component({
    selector: 'ca7o-painter',
    templateUrl: './painter.component.html',
    styleUrls: ['./painter.component.css']
})
export class PainterComponent implements OnInit {
    @ViewChild('myCanvas') canvasRef: ElementRef;
    context: CanvasRenderingContext2D
    socket: SocketIOClient.Socket

    movementBuffer: Array<any>
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
    colors: [
        { id: 'niggahs-black', name: 'Niggahs Black', hex: '#000000', isSelected: true },
        { id: 'titanium-white', name: 'Titanium White', hex: '#ffffff', isSelected: false },
        { id: 'phtalo-green', name: 'Phtalo Green', hex: '#123524', isSelected: false },
        { id: 'prussian-blue', name: 'Prussian Blue', hex: '#003153', isSelected: false },
        { id: 'van-dyke-brown', name: 'Van Dyke Brown', hex: '#584630', isSelected: false },
        { id: 'alizarin-crimson', name: 'Alizarin Crimson', hex: '#E32636', isSelected: false },
        { id: 'cadmium-yellow', name: 'Cadmium Yellow', hex: '#fff600', isSelected: false }
    ]

    constructor(private helper: PainterHelper) {
        this.socket = io(environment.apiUrl)

        this.socket.on('event', (event: WesketchClientEvent) => {
            if (event.type === 'draw') {
                console.log('event.value', event.value);
                this.context.moveTo(event.value.from.x, event.value.from.y)
                this.context.lineTo(event.value.to.x, event.value.to.y)
                this.context.stroke()
            }
        })

    }

    ngOnInit() {
        this.context = this.canvasRef.nativeElement.getContext('2d')

        this.path.from = { x: -1, y: -1 }
        this.path.to = { x: -1, y: -1 }
    }

    mouseDown(event: MouseEvent) {
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
        this.context.closePath()
        this.isDrawing = false
        this.drawingDirection = ''
    }

    mouseMove(event: MouseEvent) {
        console.log('event.shiftKey', event.shiftKey);
        this.path.to = this.helper.getCoords(event, this.context.lineWidth)
        this.drawingDirection = this.helper.calculateDrawingDirection(this.path.from)
        this.movementBuffer = this.helper.movementBuffer
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

    draw(from: Vector2, to: Vector2) {
        // this.context.moveTo(from.x, from.y)
        // this.context.lineTo(to.x, to.y)
        // this.context.stroke()

        const clientEvent: WesketchClientEvent = {
            client: this.socket.id,
            timestamp: new Date(),
            type: 'draw',
            value: { 
                from: from, to: to 
            }
        }

        this.socket.emit('event', clientEvent)

    }
}
