/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { BrandRoutingModule } from './brand-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {DialogModule} from 'primeng/dialog';
import {BrandComponent} from "./brand.component";
import {BrandListComponent} from "./component/brandlist.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        PaginatorModule,
        PageHeaderModule,
        FileUploadModule,
        DialogModule,
        BrandRoutingModule
    ],
    declarations: [BrandComponent,BrandListComponent],
})
export class BrandModule {}
