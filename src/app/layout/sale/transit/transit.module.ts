/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { TransitBillRoutingModule } from './transit-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {TransitBillComponent} from "./transit.component";
import {TransitBillListComponent} from "./component/transitlist.component";
import {TransitBillEditComponent} from "./component/transitedit.component";
import {TransitBillViewComponent} from "./component/transitview.component";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import {CorpSelectComponent} from "../../merch/corp/component/corpselect.component";

import {CorpSelectModule} from "../../merch/corp/component/corpselect.module";
import {ProductSelectModule} from "../../prod/product/component/productselect.module";
import {ProductSelectComponent} from "../../prod/product/component/productselect.component";
import {PurchaseSelectModule} from "../../puch/purchase/component/purchaseselect.module";
import {FarmSelectModule} from "../farm/component/farmselect.module";
import {PurchaseSelectComponent} from "../../puch/purchase/component/purchaseselect.component";
import {FarmSelectComponent} from "../farm/component/farmselect.component";


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
        TransitBillRoutingModule,
        CorpSelectModule,
        ProductSelectModule,
        PurchaseSelectModule,
        FarmSelectModule,
    ],
    declarations: [TransitBillComponent,TransitBillListComponent,TransitBillEditComponent,TransitBillViewComponent],
    entryComponents:[CorpSelectComponent,ProductSelectComponent,PurchaseSelectComponent,FarmSelectComponent],
})
export class TransitBillModule {}
