/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { FileUploadModule } from 'primeng/fileupload';
import {PickListModule} from 'primeng/picklist';
import {GroupComponent} from './group.component'
import {DialogModule} from 'primeng/dialog';
import {GroupRoutingModule} from "./group-routing.module";

import {CorpSelectComponent} from "../corp/component/corpselect.component";
import {CorpSelectModule} from "../corp/component/corpselect.module";
import {GroupCorpListComponent} from "./component/groupcorplist.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        PickListModule,
        DialogModule,
        FileUploadModule,
        PaginatorModule,
        PageHeaderModule,
        GroupRoutingModule,
        CorpSelectModule,
    ],
    declarations: [GroupComponent,GroupCorpListComponent,],
    entryComponents:[CorpSelectComponent]
})
export class GroupModule {}
