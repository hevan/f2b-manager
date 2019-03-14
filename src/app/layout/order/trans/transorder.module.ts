/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { TransOrderRoutingModule } from './transorder-routing.module';
import {PageHeaderModule} from '../../../shared/modules/page-header/page-header.module';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {TransOrderComponent} from './transorder.component';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';
import { TransOrderViewComponent } from './component/transorderview.component';
import {TransOrderListComponent} from './component/transorderlist.component';
import {TransOrderStatusComponent} from './component/transorderstatus.component';


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
        DialogModule,
        TabViewModule,
        TransOrderRoutingModule,
    ],
    declarations: [TransOrderComponent,TransOrderListComponent,TransOrderViewComponent,TransOrderStatusComponent],
})
export class TransOrderModule {}
