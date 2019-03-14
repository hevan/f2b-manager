/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { CorpRoutingModule } from './corp-routing.module';
import { CorpComponent } from './corp.component';
import {CorpViewComponent} from './component/corpview.component';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {CorpEditModule} from "./component/corpedit.module";
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CorpEditComponent} from "./component/corpedit.component";
import {CorpListComponent} from "./component/corplist.component";


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
        CorpRoutingModule,
        CorpEditModule,

    ],
    declarations: [CorpComponent,CorpViewComponent,CorpListComponent],
    entryComponents:[CorpEditComponent],
})
export class CorpModule {}
