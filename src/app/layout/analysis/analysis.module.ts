import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {PageHeaderModule} from "../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {CalendarModule} from 'primeng/calendar';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {DialogModule} from "primeng/dialog";
import {TabViewModule} from 'primeng/tabview';
import {AnalysisComponent} from "./analysis.component";
import {AnalysisRoutingModule} from "./analysis-routing.module";
import {SaleDetailListComponent} from "./detail/saledetaillist.component";
import {SaleDetailItemComponent} from "./detail/saledetailitem.component";
import {SaleTransOrderItemComponent} from "./detail/transitem.component";
import {SaleAfterSaleItemComponent} from "./detail/aftersaleitem.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        NgbModalModule,
        PaginatorModule,
        PageHeaderModule,
        TabViewModule,
        CalendarModule,
        DialogModule,
        FileUploadModule,
        CKEditorModule,
        AnalysisRoutingModule,
    ],
    declarations: [AnalysisComponent,SaleDetailListComponent,SaleDetailItemComponent,SaleTransOrderItemComponent,SaleAfterSaleItemComponent]
})
export class AnalysisModule {}
