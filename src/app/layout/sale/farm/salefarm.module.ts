/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { SaleFarmPurchaseRoutingModule } from './salefarm-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {SaleFarmPurchaseComponent} from "./salefarm.component";
import {SaleFarmPurchaseListComponent} from "./component/salefarmlist.component";
import {SaleFarmPurchaseEditComponent} from "./component/salefarmedit.component";
import {SaleFarmPurchaseViewComponent} from "./component/salefarmview.component";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import {CorpSelectComponent} from "../../merch/corp/component/corpselect.component";

import {CorpSelectModule} from "../../merch/corp/component/corpselect.module";
import {ProductSelectModule} from "../../prod/product/component/productselect.module";
import {PurchaseSelectModule} from "../../puch/purchase/component/purchaseselect.module";
import {PurchaseSelectComponent} from "../../puch/purchase/component/purchaseselect.component";
import {ProductSelectComponent} from "../../prod/product/component/productselect.component";


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
        CalendarModule,
        TabViewModule,
        DialogModule,
        SaleFarmPurchaseRoutingModule,
        CorpSelectModule,
        PurchaseSelectModule,
        ProductSelectModule,
    ],
    declarations: [SaleFarmPurchaseComponent,SaleFarmPurchaseListComponent,SaleFarmPurchaseEditComponent,SaleFarmPurchaseViewComponent],
    entryComponents:[CorpSelectComponent,ProductSelectComponent,PurchaseSelectComponent],
})
export class SaleFarmPurchaseModule {}
