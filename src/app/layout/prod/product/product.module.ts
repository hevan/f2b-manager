/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductComponent} from "./product.component";
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {TabViewModule} from 'primeng/tabview';
import {ProductListComponent} from "./component/productlist.component";
import {ProductEditComponent} from "./component/productedit.component";
import {ProductViewComponent} from "./component/productview.component";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from 'primeng/calendar';


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
        FileUploadModule,
        CKEditorModule,
        DialogModule,
        CalendarModule,
        ProductRoutingModule,

    ],
    declarations: [ProductComponent,ProductListComponent,ProductEditComponent,ProductViewComponent],
})
export class ProductModule {}
