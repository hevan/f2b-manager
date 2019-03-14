/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { SpecialApplyRoutingModule } from './apply-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {SpecialApplyComponent} from "./apply.component";
import {CalendarModule} from 'primeng/calendar';

import {SpecialApplyListComponent} from "./component/applylist.component";
import {SpecialApplyEditComponent} from "./component/applyedit.component";
import {SpecialApplyViewComponent} from "./component/applyview.component";
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
        SpecialApplyRoutingModule,
        CorpSelectModule,
        PurchaseSelectModule,
        FarmSelectModule,
        SpecialSelectModule,
    ],
    declarations: [SpecialApplyComponent,SpecialApplyListComponent,SpecialApplyEditComponent,SpecialApplyViewComponent],
    entryComponents:[CorpSelectComponent,PurchaseSelectComponent,FarmSelectComponent,SpecialSelectComponent],
})
export class SpecialApplyModule {}
