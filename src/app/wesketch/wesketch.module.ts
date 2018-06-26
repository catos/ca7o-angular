import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WesketchRoutingModule } from './wesketch-routing.module'

import { CoreModule } from "../core/core.module"
import { WesketchComponent } from './wesketch.component'
import { ChatComponent } from './chat/chat.component'
import { PainterComponent } from './painter/painter.component'
import { PainterHelper } from "./painter/painter.helper"

@NgModule({
    imports: [
        CommonModule,
        CoreModule,

        WesketchRoutingModule
    ],
    providers: [
        PainterHelper        
    ],
    declarations: [WesketchComponent, ChatComponent, PainterComponent]
})
export class WesketchModule { }
