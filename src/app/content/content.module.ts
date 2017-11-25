import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { ContentRoutingModule } from './content-routing.module';

import { ContentComponent } from './content.component';
import { NewsListComponent } from './news-list/news-list.component';

@NgModule({
    imports: [
        CoreModule,

        ContentRoutingModule
    ],
    declarations: [
        ContentComponent,
        NewsListComponent
    ]
})
export class ContentModule { }
