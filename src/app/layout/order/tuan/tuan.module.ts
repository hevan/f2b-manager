/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { TuanRoutingModule } from './tuan-routing.module';
import {PageHeaderModule} from '../../../shared/modules/page-header/page-header.module';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {TuanComponent} from './tuan.component';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import { TuanDistributListComponent } from './component/distributlist.component';
import { TuanDistributViewComponent } from './component/distributview.component';



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
        FileUploadModule,
        TabViewModule,
        TuanRoutingModule,
    ],
    declarations: [TuanComponent,TuanDistributListComponent,TuanDistributViewComponent],
})
export class TuanModule {}
