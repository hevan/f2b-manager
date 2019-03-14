import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule,NgbModalModule, NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import {CorpEditModule} from "../merch/corp/component/corpedit.module";
import {CorpEditComponent} from "../merch/corp/component/corpedit.component";

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModalModule,
        DashboardRoutingModule,
        CorpEditModule,
        StatModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ],
    entryComponents:[CorpEditComponent],
})
export class DashboardModule {}
