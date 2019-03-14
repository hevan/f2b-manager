/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { FarmPurchaseRoutingModule } from './farm-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FarmPurchaseComponent} from "./farm.component";
import {FarmPurchaseListComponent} from "./component/farmlist.component";
import {FarmPurchaseEditComponent} from "./component/farmedit.component";
import {FarmPurchaseViewComponent} from "./component/farmview.component";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import {CorpSelectComponent} from "../../merch/corp/component/corpselect.component";

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
        FarmPurchaseRoutingModule,
        CorpSelectModule,
    ],
    declarations: [FarmPurchaseComponent,FarmPurchaseListComponent,FarmPurchaseEditComponent,FarmPurchaseViewComponent],
    entryComponents:[CorpSelectComponent],
})
export class FarmPurchaseModule {}
