/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';
import {PageHeaderModule} from "../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {OrderComponent} from "./order.component";
import {CalendarModule} from 'primeng/calendar';
import { OrderListComponent } from './component/order/orderlist.component';
import { OrderViewComponent } from './component/order/orderview.component';


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
        OrderRoutingModule,
    ],
    declarations: [OrderComponent,OrderListComponent,OrderViewComponent],
})
export class OrderModule {}
