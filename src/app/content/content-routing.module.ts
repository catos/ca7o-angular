import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [{
    path: '',
    component: ContentComponent,
    children: [{
        path: '',
        children: [
            { path: '', component: FrontPageComponent },
            { path: 'news', component: NewsListComponent }
        ]
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentRoutingModule { }
