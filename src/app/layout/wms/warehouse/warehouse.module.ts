/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {WarehouseComponent} from "./warehouse.component";
import {TabViewModule} from 'primeng/tabview';
import {WarehouseListComponent} from "./component/warehouselist.component";
import {WarehouseEditComponent} from "./component/warehouseedit.component";
import {WarehouseViewComponent} from "./component/warehouseview.component";
import {DialogModule} from "primeng/dialog";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        NgbModalModule,
        PaginatorModule,
        PageHeaderModule,
        FileUploadModule,
        TabViewModule,
        DialogModule,
        WarehouseRoutingModule,

    ],
    declarations: [WarehouseComponent,WarehouseListComponent,WarehouseEditComponent,WarehouseViewComponent],
})
export class WarehouseModule {}
