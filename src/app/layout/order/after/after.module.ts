/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { AfterRoutingModule } from './after-routing.module';
import {PageHeaderModule} from '../../../shared/modules/page-header/page-header.module';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {AfterComponent} from './after.component';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';

import { AfterViewComponent } from './component/afterview.component';
import {AfterListComponent} from './component/afterlist.component';
import {AfterStatusComponent} from './component/afterstatus.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        NgbModalModule,
        CalendarModule,
        PaginatorModule,
        PageHeaderModule,
        DialogModule,
        FileUploadModule,
        TabViewModule,
        AfterRoutingModule,
    ],
    declarations: [AfterComponent,AfterListComponent,AfterViewComponent,AfterStatusComponent],
})
export class AfterModule {}
