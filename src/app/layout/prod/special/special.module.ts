/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { SpecialProductRoutingModule } from './special-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {SpecialProductComponent} from "./special.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {TabViewModule} from 'primeng/tabview';
import {SpecialProductListComponent} from "./component/speciallist.component";
import {SpecialProductEditComponent} from "./component/specialedit.component";
import {SpecialProductViewComponent} from "./component/specialview.component";
import {DialogModule} from "primeng/dialog";


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
        SpecialProductRoutingModule,

    ],
    declarations: [SpecialProductComponent,SpecialProductListComponent,SpecialProductEditComponent,SpecialProductViewComponent],
})
export class SpecialProductModule {}
