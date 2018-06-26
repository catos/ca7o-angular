import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { WesketchComponent } from './wesketch.component'

const routes: Routes = [{
    path: 'wesketch',
    component: WesketchComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WesketchRoutingModule { }
