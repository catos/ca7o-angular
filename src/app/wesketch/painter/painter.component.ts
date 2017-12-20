import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core'
import { PainterHelper } from "./painter.helper";
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

    movementBuffer: Array<any>
    confirmOperation: boolean = false
    isDrawing: boolean = false
    drawingDirection: ''
    isShiftKeyDown: false
    canvas: {
        width: 0
        height: 0
    }

    path: Vector2Path = { from: new Vector2(), to: new Vector2() }

    // TODO: debug
    mousePosition: Vector2 = { x: 0, y: 0 }

    currentTool: 'brush'
    brushSize: 5
    foregroundColor: '#000000'
    backgroundColor: '#ffffff'
    colors: [
        { id: 'niggahs-black', name: 'Niggahs Black', hex: '#000000', isSelected: true },
        { id: 'titanium-white', name: 'Titanium White', hex: '#ffffff', isSelected: false },
        { id: 'phtalo-green', name: 'Phtalo Green', hex: '#123524', isSelected: false },
        { id: 'prussian-blue', name: 'Prussian Blue', hex: '#003153', isSelected: false },
        { id: 'van-dyke-brown', name: 'Van Dyke Brown', hex: '#584630', isSelected: false },
        { id: 'alizarin-crimson', name: 'Alizarin Crimson', hex: '#E32636', isSelected: false },
        { id: 'cadmium-yellow', name: 'Cadmium Yellow', hex: '#fff600', isSelected: false }
    ]    

    constructor(private helper: PainterHelper) { }

    ngOnInit() {
        this.context = this.canvasRef.nativeElement.getContext('2d')

        this.path.from = { x: -1, y: -1 }
        this.path.to = { x: -1, y: -1 }
    }

    // @HostListener('mousedown', ['$event'])
    mouseDown(event: MouseEvent) {
        console.log('event', event);
        this.context.strokeStyle = this.foregroundColor
        // if (event.which === 3) {
        //     this.context.strokeStyle = this.backgroundColor
        // }
        this.mousePosition = this.helper.getCoords(event, this.context.lineWidth)
        // if (this.currentTool === 'brush') {
            // this.context.beginPath()
            // this.isDrawing = true
            // this.path.prev = path
            // this.draw(this.path.prev, this.path.prev)
        // }
        // if (this.currentTool === 'fill') {
        //     this.fill(event)
        // }
    }

    // @HostListener('mouseup', ['$event'])
    mouseUp(event: MouseEvent) {
        console.log('mouseUp')
    }

    // @HostListener('mousemove', ['$event'])
    mouseMove(event: MouseEvent) {
        // console.log('mouseMove')
    }

    // @HostListener('mouseout', ['$event'])
    mouseOut(event: MouseEvent) {
        console.log('mouseOut')
    }

    draw(prev, to) {
        this.context.moveTo(prev.x, prev.y)
        this.context.lineTo(to.x, to.y)
        this.context.stroke()
    }
}
