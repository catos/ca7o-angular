import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WesketchRoutingModule } from './wesketch-routing.module';

import { CoreModule } from "../core/core.module";
import { WesketchComponent } from './wesketch.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,

    WesketchRoutingModule
  ],
  declarations: [WesketchComponent, ChatComponent]
})
export class WesketchModule { }
