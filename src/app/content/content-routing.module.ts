import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [{
    path: '',
    component: ContentComponent,
    children: [{
        path: '',
        children: [
            { path: '', component: NewsListComponent }
        ]
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentRoutingModule { }
