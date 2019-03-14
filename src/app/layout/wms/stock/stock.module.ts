/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { StockRoutingModule } from './stock-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'

import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {StockComponent} from "./stock.component";
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import {EnterStockListComponent} from "./enter/enterstocklist.component";
import {EnterStockEditComponent} from "./enter/enterstockedit.component";
import {EnterStockViewComponent} from "./enter/enterstockview.component";
import {OutStockListComponent} from "./out/outstocklist.component";
import {OutStockEditComponent} from "./out/outstockedit.component";
import {OutStockViewComponent} from "./out/outstockview.component";
import {ProductStockComponent} from "./product/productstock.component";

import {CorpSelectModule} from "../../merch/corp/component/corpselect.module";
import {ProductSelectModule} from "../../prod/product/component/productselect.module";
import {CorpSelectComponent} from "../../merch/corp/component/corpselect.component";
import {ProductSelectComponent} from "../../prod/product/component/productselect.component";
import {WarehouseSelectModule} from "../warehouse/component/warehouseselect.module";
import {WarehouseSelectComponent} from "../warehouse/component/warehouseselect.component";

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
        CalendarModule,
        StockRoutingModule,
        CorpSelectModule,
        ProductSelectModule,
        WarehouseSelectModule,
    ],
    declarations: [StockComponent,EnterStockListComponent,EnterStockEditComponent,EnterStockViewComponent,OutStockListComponent,OutStockEditComponent,OutStockViewComponent,ProductStockComponent],
    entryComponents:[CorpSelectComponent,ProductSelectComponent,WarehouseSelectComponent],
})
export class StockModule {}
