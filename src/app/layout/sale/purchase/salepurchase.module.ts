/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { SalePurchaseRoutingModule } from './salepurchase-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {SalePurchaseComponent} from "./salepurchase.component";
import {SalePurchaseListComponent} from "./component/salepurchaselist.component";
import {SalePurchaseEditComponent} from "./component/salepurchaseedit.component";
import {SalePurchaseViewComponent} from "./component/salepurchaseview.component";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import {CorpSelectComponent} from "../../merch/corp/component/corpselect.component";
import {ProductSelectComponent} from "../../prod/product/component/productselect.component";

import {CorpSelectModule} from "../../merch/corp/component/corpselect.module";
import {ProductSelectModule} from "../../prod/product/component/productselect.module";


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
        SalePurchaseRoutingModule,
        CorpSelectModule,
        ProductSelectModule,
    ],
    declarations: [SalePurchaseComponent,SalePurchaseListComponent,SalePurchaseEditComponent,SalePurchaseViewComponent],
    entryComponents:[CorpSelectComponent,ProductSelectComponent],
})
export class SalePurchaseModule {}
