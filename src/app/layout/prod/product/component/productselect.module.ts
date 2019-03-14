/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


import {PageHeaderModule} from "../../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductSelectComponent} from "./productselect.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        NgbModalModule,
        PaginatorModule,
        PageHeaderModule,
        FileUploadModule
    ],
    declarations: [ProductSelectComponent],
    exports: [ProductSelectComponent]
})
export class ProductSelectModule {}
