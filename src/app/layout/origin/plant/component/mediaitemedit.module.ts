/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


import {PageHeaderModule} from "../../../../shared/modules/page-header/page-header.module";
import { FileUploadModule } from 'primeng/fileupload';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {MediaItemEditComponent} from "./mediaitemedit.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModalModule,
        PageHeaderModule,
        FileUploadModule
    ],
    declarations: [MediaItemEditComponent],
    exports: [MediaItemEditComponent]
})
export class MediaItemEditModule {}
