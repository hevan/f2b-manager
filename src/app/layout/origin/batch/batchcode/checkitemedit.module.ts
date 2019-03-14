/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import {PageHeaderModule} from "../../../../shared/modules/page-header/page-header.module";
import { FileUploadModule } from 'primeng/fileupload';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {DialogModule} from "primeng/dialog";
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CheckItemEditComponent} from "./checkitemedit.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        NgbModalModule,
        DialogModule,
        PageHeaderModule,
        FileUploadModule
    ],
    declarations: [CheckItemEditComponent],
    exports: [CheckItemEditComponent]
})
export class CheckItemEditModule {}
