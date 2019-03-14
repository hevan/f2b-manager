/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';
import {PageHeaderModule} from '../../../shared/modules/page-header/page-header.module';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {OrderComponent} from './order.component';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import { OrderViewComponent } from './component/orderview.component';
import {OrderListComponent} from './component/orderlist.component';
import {OrderStatusComponent} from './component/orderstatus.component';
import {TransOrderItemComponent} from "./component/transorderitem.component";
import {AfterSaleItemComponent} from "./component/afteritem.component";


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
        OrderRoutingModule,
    ],
    declarations: [OrderComponent,OrderListComponent,OrderViewComponent,OrderStatusComponent,TransOrderItemComponent,AfterSaleItemComponent],
})
export class OrderModule {}
