/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { RecvTransitBillRoutingModule } from './recvtransit-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {RecvTransitBillComponent} from "./recvtransit.component";
import {RecvTransitBillListComponent} from "./component/recvtransitlist.component";
import {RecvTransitBillEditComponent} from "./component/recvtransitedit.component";
import {RecvTransitBillViewComponent} from "./component/recvtransitview.component";
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
        RecvTransitBillRoutingModule,
        CorpSelectModule,
    ],
    declarations: [RecvTransitBillComponent,RecvTransitBillListComponent,RecvTransitBillEditComponent,RecvTransitBillViewComponent],
    entryComponents:[CorpSelectComponent],
})
export class RecvTransitBillModule {}
