/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import {PageHeaderModule} from "../../../../shared/modules/page-header/page-header.module";
import { FileUploadModule } from 'primeng/fileupload';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from "primeng/dialog";
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {BatchMaterielEditComponent} from "./batchmaterieledit.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        NgbModalModule,
        CalendarModule,
        DialogModule,
        PageHeaderModule,
        FileUploadModule
    ],
    declarations: [BatchMaterielEditComponent],
    exports: [BatchMaterielEditComponent]
})
export class BatchMaterielEditModule {}
