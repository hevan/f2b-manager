/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { OrderManageRoutingModule } from './ordermanage-routing.module';
import {PageHeaderModule} from "../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {OrderManageComponent} from "./ordermanage.component";
import {CalendarModule} from 'primeng/calendar';


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
        OrderManageRoutingModule,
    ],
    declarations: [OrderManageComponent],
})
export class OrderManageModule {}
