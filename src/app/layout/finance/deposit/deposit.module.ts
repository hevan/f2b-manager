/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { DepositRoutingModule } from './deposit-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {DepositComponent} from "./deposit.component";
import {CalendarModule} from 'primeng/calendar';

import {DepositListComponent} from "./component/depositlist.component";
import {DepositEditComponent} from "./component/depositedit.component";
import {DepositViewComponent} from "./component/depositview.component";

import {CorpSelectModule} from "../../merch/corp/component/corpselect.module";
import {CorpSelectComponent} from "../../merch/corp/component/corpselect.component";
import {PurchaseSelectModule} from "../../puch/purchase/component/purchaseselect.module";
import {FarmSelectModule} from "../../sale/farm/component/farmselect.module";
import {PurchaseSelectComponent} from "../../puch/purchase/component/purchaseselect.component";
import {FarmSelectComponent} from "../../sale/farm/component/farmselect.component";
import {SpecialSelectModule} from "../../prod/special/component/specialselect.module";
import {SpecialSelectComponent} from "../../prod/special/component/specialselect.component";

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
        DepositRoutingModule,
        CorpSelectModule,
        PurchaseSelectModule,
        FarmSelectModule,
        SpecialSelectModule
    ],
    declarations: [DepositComponent,DepositListComponent,DepositEditComponent,DepositViewComponent],
    entryComponents:[CorpSelectComponent,PurchaseSelectComponent,FarmSelectComponent],
})
export class DepositModule {}
